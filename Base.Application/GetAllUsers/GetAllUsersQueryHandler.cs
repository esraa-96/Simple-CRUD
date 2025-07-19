using Base.Domain;
using MediatR;

namespace Base.Application.GetAllUsers;

public class GetAllUsersQueryHandler(IUserRepository userRepository) : IRequestHandler<GetAllUsersQuery, IEnumerable<User>>
{
    public Task<IEnumerable<User>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        => Task.FromResult(userRepository.GetAll());
}
