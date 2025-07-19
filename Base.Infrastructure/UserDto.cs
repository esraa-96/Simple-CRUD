namespace Base.Infrastructure;

public partial class AuthService
{
    public class UserDto
    {
        public Guid Id { get; set; } 
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } 
        public bool IsActive { get; set; } 
    }
}
