using Base.Domain;
using Base.Infrastructure;
using MediatR;

namespace Base.Application.GetUserById;

public record GetUserByIdQuery(Guid Id) : IRequest<User?>;