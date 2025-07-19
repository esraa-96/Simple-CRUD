using Base.Infrastructure;
using MediatR;

namespace Base.Application.UpdateUser;

public record UpdateUserCommand(Guid Id, string UserName, string Email, string PasswordHash, bool IsActive) : IRequest<bool>;
