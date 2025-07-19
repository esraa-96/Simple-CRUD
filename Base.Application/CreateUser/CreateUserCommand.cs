using Base.Domain;
using Base.Infrastructure;
using MediatR;

namespace Base.Application.CreateUser;

public record CreateUserCommand(string UserName, string Email, string PasswordHash, bool IsActive) : IRequest<User>;