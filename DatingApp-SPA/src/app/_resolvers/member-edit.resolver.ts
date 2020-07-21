import { Injectable } from "@angular/core";
import { User } from "../_models/user";
import { Resolve, Router,ActivatedRouteSnapshot } from "@angular/router"
import { UserService } from "../_services/user.service";

import {AlertifyServiceService} from "../_services/AlertifyService.service";
import { Observable, of } from "rxjs";
import {catchError} from "rxjs/operators";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class MemberEditResolver implements Resolve<User> {

    constructor(private userService: UserService, private router: Router,private authService: AuthService,private alertify:AlertifyServiceService){}

    resolve(route: ActivatedRouteSnapshot) : Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}