import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyServiceService } from '../../_services/AlertifyService.service';
import { MemberListResolver } from '../../_resolvers/member-list.resolver';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
users: User[];
radioModel: any;
user:User = JSON.parse(localStorage.getItem('user'));
genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
userParams: any = {};

pagination:Pagination;
  constructor(private userService: UserService, private alertify: AlertifyServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data)=>{
      this.users = data['users'].results;
      this.pagination = data['users'].pagination;
    });

    this.userParams.gender = this.user.gender == 'male' ? 'female' : 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive'
  }

  pageChanged(event: any ) : void
  {
    console.log(event.page);
      this.pagination.currentPage = event.page;
      this.loadUsers();

  }

  sortBy()
  {
    console.log("Sorting");
  }

  resetFilters()
  {
    this.userParams.gender = this.user.gender == 'male' ? 'female' : 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe((res: PaginatedResult<User[]>)=>{
        this.users = res.results;
        this.pagination = res.pagination;
    }, error =>{
      this.alertify.error(error);
    })
  }

}
