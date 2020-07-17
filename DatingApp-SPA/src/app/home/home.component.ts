import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertifyServiceService } from '../_services/AlertifyService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registerMode = false;
values: any;

  constructor(private http:HttpClient, private alertify:AlertifyServiceService) { }

  ngOnInit() {
    this.getBooks();
  }

  registerToggle()
  {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean)
  {
    this.registerMode = registerMode;
  }

  getBooks()
  {
    const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

    this.http.get('http://localhost:5000/api/values', { 'headers': headers }).subscribe(res=>{
      this.values = res;
      // this.alertify.success(this.values);
    }, error =>{
      // this.alertify.error(error);
    });
  }

}
