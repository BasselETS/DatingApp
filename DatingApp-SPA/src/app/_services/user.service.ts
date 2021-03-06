import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AuthService } from './auth.service';
import { Photo } from '../_models/photo';
import {PaginatedResult} from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_models/message';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  


baseUrl = environment.apiUrl;

constructor(private http:HttpClient) { }

getUsers(page?, itemsPerPage?, userParams?, likesParam?) : Observable<PaginatedResult<User[]>>
{
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

  let params = new HttpParams();
  if(page != null && itemsPerPage != null)
  {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if(userParams != null)
  {
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
  }

  if(likesParam === 'Likers'){
    params = params.append('Likers', 'true');
  }

  if(likesParam === 'Likees'){
    params = params.append('Likees', 'true');
  }
  return this.http.get<User[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(
    map(response=>{
      paginatedResult.results = response.body;
      if(response.headers.get('Pagination') != null)
      {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

getUser(id) : Observable<User>
{
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}

updateUser(id: number, user:User)
{
  return this.http.put(this.baseUrl + 'users/' + id, user);
}

updateUserMainPhoto(id: number, userId: number)
{
  return this.http.post(this.baseUrl + 'users/'+ userId + '/photos/' + id + '/setMain',{});
}


deletePhoto(userId: number, photoId: number)
{
  return this.http.delete(this.baseUrl + 'users/' + userId+ '/photos/' + photoId);
}

sendLike(id: number, receipientId: number)
{
  return this.http.post(this.baseUrl + 'users/' + id + '/like/' + receipientId, {});
}

getMessages(id: number, page?, itemsPerPage?, messageContainer?)
{
  const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
  let params = new HttpParams();

  params = params.append('MessageContainer', messageContainer);
  
  if(page != null && itemsPerPage != null)
  {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages', { observe: 'response', params })
  .pipe(map(response=>{
    paginatedResult.results = response.body;
    if(response.headers.get('pagination') != null)
    {
      paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
    }

    return paginatedResult;
  }));

}


getMessagesThread(id: number, recipientId: number)
{
  return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId);
}

sendMessage(id: number, recipientId: number, content: string)
{
  console.log(content);
  return this.http.post(this.baseUrl + 'users/' + id + '/messages', {
    "recipientId": recipientId,
    "content": content
  });
}

deleteMessage(id: number, userId: number)
{
  return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
}

markMessageRead(userId: number,id: number)
{
  return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id + '/read', {}).subscribe();
}

getUnreadMessages(userId: number)
{
  return this.http.get(this.baseUrl + 'users/' + userId + '/unreadMessages');
}
}


