using Base.Domain;
using Base.Infrastructure;
using MediatR;

namespace Base.Application.UpdateBook;

public class UpdateBookCommandHandler(IBookRepository bookRepository) : IRequestHandler<UpdateBookCommand, bool>
{
    public async Task<bool> Handle(UpdateBookCommand request, CancellationToken cancellationToken)
    {
        var book = await bookRepository.GetByIdAsync(request.Id);
        if (book == null)
            return false;

        book.Title = request.Title;
        book.Author = request.Author;
        await bookRepository.UpdateAsync(book);
        return true;
    }
}
