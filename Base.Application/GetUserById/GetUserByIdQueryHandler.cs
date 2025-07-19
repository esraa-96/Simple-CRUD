using Base.Domain;
using MediatR;

namespace Base.Application.GetUserById;

public class GetUserByIdQueryHandler(IUserRepository userRepository) : IRequestHandler<GetUserByIdQuery, User?>
{
    public Task<User?> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        => Task.FromResult(userRepository.GetById(request.Id));
}