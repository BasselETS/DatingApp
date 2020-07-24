import { Component, OnInit } from '@angular/core';
import {Message} from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/Pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyServiceService } from '../_services/AlertifyService.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
messages: Message[];
pagination: Pagination;
messageContainer = 'Unread';

  constructor(private userService: UserService, private authService: AuthService,
    private route: ActivatedRoute, private alertify:AlertifyServiceService) { }

  ngOnInit() {

    this.route.data.subscribe(data=>{
      this.messages = data['messages'].results;
      this.pagination = data['messages'].pagination;
    })
  }

  loadMessages()
  {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
    .subscribe((res: PaginatedResult<Message[]>)=>{
      this.messages= res.results;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    })
  }

  pageChanged(event: any)
  {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number)
  {
    this.alertify.confirm('Are you sure do you want to delete the message', ()=>{
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(()=>{
        this.messages.splice(this.messages.findIndex(i => i.id == id),1);
        this.alertify.success('Message has been deleted');
      })
    })
  }

}
