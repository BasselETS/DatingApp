import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyServiceService } from '../../_services/AlertifyService.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AuthService } from 'src/app/_services/auth.service';
//
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', {static:true}) memberTabs: TabsetComponent;
user:User;
galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

  constructor(private userService:UserService, private alertify: AlertifyServiceService,
     private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab :0].active = true;
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

  selectTab(tabId: number)
  {
    this.memberTabs.tabs[tabId].active = true;
  }

  likeUser()
  {
    this.userService.sendLike(this.authService.decodedToken.nameid, this.user.id).subscribe(()=>{
      this.alertify.success("You have successfully liked " + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }
}
