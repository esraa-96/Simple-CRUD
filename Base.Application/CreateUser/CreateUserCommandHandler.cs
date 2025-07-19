using Base.Domain;
using MediatR;

namespace Base.Application.CreateUser;

public class CreateUserCommandHandler(IUserRepository userRepository) : IRequestHandler<CreateUserCommand, User>
{
    public Task<User> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var user = new User
        {
            UserName = request.UserName,
            Email = request.Email,
            PasswordHash = request.PasswordHash,
            CreatedAt = DateTime.UtcNow,
            IsActive = request.IsActive
        };
        userRepository.Add(user);
        return Task.FromResult(user);
    }
}