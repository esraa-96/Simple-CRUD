using Base.Domain;
using MediatR;

namespace Base.Application.UpdateUser;

public class UpdateUserCommandHandler(IUserRepository userRepository) : IRequestHandler<UpdateUserCommand, bool>
{
    public Task<bool> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var user = userRepository.GetById(request.Id);
        if (user == null)
            return Task.FromResult(false);

        user.UserName = request.UserName;
        user.Email = request.Email;
        user.PasswordHash = request.PasswordHash;
        user.IsActive = request.IsActive;
        userRepository.Update(user);
        return Task.FromResult(true);
    }
}
