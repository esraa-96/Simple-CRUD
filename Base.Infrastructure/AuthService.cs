using Base.Domain;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using BC = BCrypt.Net.BCrypt;

namespace Base.Infrastructure;

public partial class AuthService(IUserRepository userRepository, IConfiguration configuration) : IAuthService
{
    public AuthResponseDto Authenticate(string email, string password)
    {
        var user = userRepository.GetByEmail(email);
        if (user is null || !VerifyPassword(user.PasswordHash, password))
            throw new UnauthorizedAccessException("Invalid");
        if (!user.IsActive)
            throw new UnauthorizedAccessException("User account is inactive.");

        var token = GenerateJwtToken(user);
        var refreshToken = GenerateRefreshToken(user);

        return new AuthResponseDto
        {
            Token = token,
            RefreshToken = refreshToken,
            ExpiresAt = DateTime.UtcNow.AddHours(1),
            User = MapToUserDto(user)
        };
    }
    
    private bool VerifyPassword(string storedHash, string password)
    {
        return BC.Verify(password, storedHash);
    }

    private string GenerateJwtToken(User user)
    {
        var jwtSecret = configuration["Jwt:Secret"] ?? throw new ArgumentNullException("Jwt:Secret");
        var jwtIssuer = configuration["Jwt:Issuer"] ?? throw new ArgumentNullException("Jwt:Issuer");
        var jwtAudience = configuration["Jwt:Audience"] ?? throw new ArgumentNullException("Jwt:Audience");

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("username", user.UserName),
            new Claim("isActive", user.IsActive.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    
    private string GenerateRefreshToken(User user)
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    private UserDto MapToUserDto(User user)
    {
        return new UserDto
        {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            IsActive = user.IsActive,
            CreatedAt = user.CreatedAt,
        };
    }

    public bool Register(string userName, string email, string password)
    {
        if (userRepository.GetByEmail(email) is not null)
            return false;

        var user = new User
        {
            UserName = userName,
            Email = email,
            PasswordHash = HashPassword(password),
            CreatedAt = DateTime.UtcNow,
            IsActive = true
        };

        userRepository.Add(user);
        
        return true;
    }
    
    private string HashPassword(string password)
    {
        return BC.HashPassword(password, BC.GenerateSalt(12));
    }
}
