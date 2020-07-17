import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyServiceService } from '../_services/AlertifyService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(): boolean{
    
    if(this.authService.loggedIn())
    return true;
    
    this.alertify.error('You shall not pass!!!');
    this.router.navigate(['/home']);
    return false;
  }

  constructor(private authService:AuthService, private router:Router, private alertify:AlertifyServiceService){

  }
  
}
