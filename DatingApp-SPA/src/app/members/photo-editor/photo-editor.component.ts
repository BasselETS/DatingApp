import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import {AuthService} from '../../_services/auth.service';
import { fromEventPattern } from 'rxjs';
import { UserService } from '../../_services/user.service';
import {AlertifyServiceService} from '../../_services/AlertifyService.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

@Input() photos: Photo[];
@Output() getMemberPhotoChange = new EventEmitter<string>();

uploader:FileUploader;
hasBaseDropZoneOver = false;

baseUrl = environment.apiUrl;

  constructor(private authService: AuthService, private userService: UserService, private alertify:AlertifyServiceService) { }

  ngOnInit() {
    this.initializeUploader();
  }
  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo)
  {
    this.userService.updateUserMainPhoto(photo.id, this.authService.decodedToken.nameid).subscribe(()=>{
      this.alertify.success("Set As Main");
      this.photos.forEach(photores => {
        if(photores.isMain)
        photores.isMain = false
      });
      
      photo.isMain = true;
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error => {
      this.alertify.error(error);
    });
  }

  deletePhoto(photo: Photo)
  {
    this.alertify.confirm('Are you sure you want to delete the photo?', ()=>{
      this.userService.deletePhoto(this.authService.decodedToken.nameid, photo.id).subscribe(()=>{
        this.alertify.success('Photo Deleted');
        var i = -1;
        for (let index = 0; index < this.photos.length; index++) {
          if(this.photos[index] == photo)
            i = index;
        }
          this.photos.splice(i,1);
  
      }, error => {
        this.alertify.error(error);
      });
    });
  }

  initializeUploader()
  {
    this.uploader = new FileUploader({
url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
authToken:'Bearer ' + localStorage.getItem('token'),
isHTML5: true,
allowedFileType: ['image'],
removeAfterUpload: true,
autoUpload: false,
maxFileSize: 10*1024*1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
    this.uploader.onSuccessItem = (item, response,status,headers)=>{
      if(response)
      {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        }
        this.photos.push(photo);
        if(photo.isMain)
        {
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
      }
    }
  }
  

}
