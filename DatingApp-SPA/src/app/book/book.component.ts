import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getBooks();
  }
  getBooks()
  {
    this.http.get("http://localhost:5000/book").subscribe(response => {
      this.books = response;
    })
    
  }

}
