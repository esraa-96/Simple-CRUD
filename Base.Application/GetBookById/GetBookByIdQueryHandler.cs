using Base.Domain;
using Base.Infrastructure;
using MediatR;

namespace Base.Application.GetBookById;

public class GetBookByIdQueryHandler(IBookRepository bookRepository) : IRequestHandler<GetBookByIdQuery, BookDto?>
{
    public async Task<BookDto?> Handle(GetBookByIdQuery request, CancellationToken cancellationToken)
    {
        var book = await bookRepository.GetByIdAsync(request.Id);
        return book == null ? null : new BookDto { Id = book.Id, Title = book.Title, Author = book.Author };
    }
}
