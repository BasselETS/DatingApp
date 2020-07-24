import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyServiceService } from 'src/app/_services/AlertifyService.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
@Input() recipientId: number;
messages: Message[];
messageContent = "";

  constructor(private authservice: AuthService, private userService: UserService, private alertify:AlertifyServiceService) { }

  ngOnInit() {
    this.loadMessages();
  }


  loadMessages()
  {
    this.userService.getMessagesThread(this.authservice.decodedToken.nameid, this.recipientId).subscribe(messages => {
      this.messages = messages;
      console.log(messages);
    }, error => {
      this.alertify.error(error);
    });
  }

    sendMessage()
    {
      console.log(this.messageContent);
      if(this.messageContent === "")
      {
        this.alertify.error('Cannot send an empty message');
        return;
      } 
      this.userService.sendMessage(this.authservice.decodedToken.nameid, this.recipientId, this.messageContent).subscribe((message:Message)=>{
        
        this.messages.unshift(message);
        this.messageContent = "";
        this.alertify.success('Message was sent successfully');
      }, error => {
        this.alertify.error(error);
      });
    }
    
  

}
