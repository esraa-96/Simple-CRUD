using Base.Application;
using Base.Application.CreateBook;
using Base.Application.DeleteBook;
using Base.Application.GetAllBooks;
using Base.Application.GetBookById;
using Base.Application.UpdateBook;
using Base.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Base.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class BookController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookDto>>> GetBooks()
    {
        var books = await mediator.Send(new GetBooksQuery());
        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookDto>> GetBook(int id)
    {
        var book = await mediator.Send(new GetBookByIdQuery(id));
        if (book == null)
            return NotFound();
        return Ok(book);
    }

    [HttpPost]
    public async Task<IActionResult> CreateBook([FromBody] CreateBookCommand command)
    {
        var book = await mediator.Send(command);
        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, [FromBody] UpdateBookCommand command)
    {
        if (id != command.Id)
            return BadRequest();

        var result = await mediator.Send(command);
        if (!result)
            return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var result = await mediator.Send(new DeleteBookCommand(id));
        if (!result)
            return NotFound();
        return NoContent();
    }
}