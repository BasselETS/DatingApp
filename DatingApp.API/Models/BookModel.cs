using System;

namespace DatingApp.API.Models
{
    public class BookModel
    {
        private string bookName;
        public enum GenreBook { Action, Adventure, Novel, Science, Physics }
        private string genre;

        public string BookName { get => bookName; set => bookName = value; }
        public string Genre { get => genre; set => genre = value; }

        private int _id;
        public int id {get=> _id; set => _id = value;} 
    }
}