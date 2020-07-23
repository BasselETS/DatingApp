import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../_models/Pagination';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { AlertifyServiceService } from '../_services/AlertifyService.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
users: User[];
user: User;
pagination: Pagination;
likesParam: string;

genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
userParams: any = {};

  constructor(private autService: AuthService, private userService: UserService, private alertify: AlertifyServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.route.data.subscribe(data => {
      this.users = data['users'].results;
      this.pagination = data['users'].pagination;
    });

    this.userParams.gender = this.user.gender == 'male' ? 'female' : 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';

    this.likesParam = 'Likers';
  }

  pageChanged(event: any ) : void
  {
    console.log(event.page);
      this.pagination.currentPage = event.page;
      this.loadUsers();

  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams,this.likesParam).subscribe((res: PaginatedResult<User[]>)=>{
        this.users = res.results;
        this.pagination = res.pagination;
    }, error =>{
      this.alertify.error(error);
    });
  }

}
