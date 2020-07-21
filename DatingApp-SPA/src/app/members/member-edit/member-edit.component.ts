import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';
import { NgxGalleryOptions, NgxGalleryImage,NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import {AlertifyServiceService} from '../../_services/AlertifyService.service';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
user: User;
@ViewChild('editForm') editForm: NgForm;

@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any)
{
  if(this.editForm.dirty)
  $event.returnValue = true;
}

galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
  constructor(private route: ActivatedRoute, private alertify: AlertifyServiceService, private userService: UserService, private authService:AuthService) { }

  ngOnInit() {
    this.route.data.subscribe((data)=>{
      this.user = data['user'];
    })

    
    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }];

    this.galleryImages = this.getImages();
  }

  getImages()
  {
    const imageUrls = [];
    for(const photo of this.user.photos)
    {
    imageUrls.push({
      small: photo.url,
      medium: photo.url,
      big: photo.url,
      description: photo.description
    });
  }

  return imageUrls;

  }

  updateUser()
  {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {

      this.alertify.success('Profile Updated Successfully');
      this.editForm.reset(this.user);
    }, error=>{
      this.alertify.error(error);
    })
  }

}
