using Base.Domain;
using Base.Infrastructure;
using MediatR;

namespace Base.Application.GetAllUsers;

public record GetAllUsersQuery() : IRequest<IEnumerable<User>>;