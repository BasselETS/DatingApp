using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API.Models;
using DatingApp.API.Data;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace DatingApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly DataContext context;
        public BookController(DataContext context)
        {
            this.context = context;

        }
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await context.Books.ToListAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            BookModel value = await context.Books.FirstOrDefaultAsync(book => book.id == id);
            return Ok(value);
        }

        [HttpGet("GetByGenre/{genre}")]
        public async Task<IActionResult> Get(string genre)
        {
            List<BookModel> genres = new List<BookModel>();
            await context.Books.ForEachAsync((book) =>
            {
                Console.WriteLine("========>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                Console.WriteLine(book.Genre);
                Console.WriteLine(genre);

                if (book.Genre.ToLower() == genre.ToLower())
                    genres.Add(book);
            }
            );
            return Ok(genres);

        }
        public List<BookModel> GetRandomBook()
        {
            List<BookModel> books = new List<BookModel>();
            books.Add(new BookModel()
            {
                BookName = "Psyco",
                Genre = "psychology",
                id = 1
            });
            books.Add(new BookModel()
            {
                BookName = "Come To Papa",
                Genre = "thriller",
                id = 2
            });
            books.Add(new BookModel()
            {
                BookName = "Come To Mama",
                Genre = "thriller",
                id = 3
            });
            books.Add(new BookModel()
            {
                BookName = "Come To Dadda",
                Genre = "thriller",
                id = 4
            });
            books.Add(new BookModel()
            {
                BookName = "Come Work At Eurisko",
                Genre = "horror",
                id = 5
            });
            books.Add(new BookModel()
            {
                BookName = "Eddie Is calling",
                Genre = "horror",
                id = 6
            });
            books.Add(new BookModel()
            {
                BookName = "Response Null",
                Genre = "horror",
                id = 7
            });
            books.Add(new BookModel()
            {
                BookName = "Build succeeded",
                Genre = "comedy",
                id = 8
            });
            books.Add(new BookModel()
            {
                BookName = "No Error Found",
                Genre = "comedy",
                id = 9
            });
            books.Add(new BookModel()
            {
                BookName = "iOS Build Completed With No Exception",
                Genre = "science fiction",
                id = 10
            });
            books.Add(new BookModel()
            {
                BookName = "You are a good developer",
                Genre = "science fiction",
                id = 11
            });
            books.Add(new BookModel()
            {
                BookName = "You are going to get a raise",
                Genre = "science fiction",
                id = 12
            });
            books.Add(new BookModel()
            {
                BookName = "We are opening a new sub-eurisko gaming company",
                Genre = "science fiction",
                id = 13
            });
            books.Add(new BookModel()
            {
                BookName = "You are only going to work 3 month on .netcore",
                Genre = "science fiction",
                id = 14
            });
            return books;
        }
    }
}