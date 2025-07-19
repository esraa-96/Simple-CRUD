using Base.Infrastructure;
using MediatR;

namespace Base.Application.DeleteUser;

public record DeleteUserCommand(Guid Id) : IRequest<bool>;