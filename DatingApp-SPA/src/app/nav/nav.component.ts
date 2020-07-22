import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyServiceService } from '../_services/AlertifyService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  constructor(private authService: AuthService, private alertify : AlertifyServiceService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success("Logged In Successfully");
    }, error => {
      this.alertify.error(error);
    }, () =>{
      this.router.navigate(['/members']);
    });
  }

  loggedIn()
  {
    return this.authService.loggedIn();
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.currentUser = null;
    this.authService.decodedToken = null;
    this.alertify.message("Logged Out Successfully");
    this.router.navigate(['/home']);
  }

}
