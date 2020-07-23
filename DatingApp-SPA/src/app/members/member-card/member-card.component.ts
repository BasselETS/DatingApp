import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyServiceService } from 'src/app/_services/AlertifyService.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() user: User;
  constructor(private authServec: AuthService, private userService: UserService, private alertify:AlertifyServiceService) { }

  ngOnInit() {
  }

  

  likeUser()
  {
    this.userService.sendLike(this.authServec.decodedToken.nameid, this.user.id).subscribe(()=>{
      this.alertify.success("You have successfully liked " + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }

}
