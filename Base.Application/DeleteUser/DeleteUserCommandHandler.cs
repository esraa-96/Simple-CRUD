using Base.Domain;
using MediatR;

namespace Base.Application.DeleteUser;

public class DeleteUserCommandHandler(IUserRepository userRepository) : IRequestHandler<DeleteUserCommand, bool>
{
    public Task<bool> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        var user = userRepository.GetById(request.Id);
        if (user == null)
            return Task.FromResult(false);

        userRepository.Delete(request.Id);
        return Task.FromResult(true);
    }
}
