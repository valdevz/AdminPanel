import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { ActivatedRoute } from "@angular/router";
import { IconDefinition, faHouse, faEnvelope, faPhone, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

interface uDetails {
  dateOfBirth: string,
  email: string,
  firstName: string,
  gender: string,
  id: string,
  lastName: string,
  location: {street: string, city: string, state: string, country: string, timezone:string}
  phone: string,
  picture: string,
  registerDate: string,
  title: string,
  updatedDate: string,
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userDetail!: uDetails ;
  userPosts! : object;
  modalImage : string = '';
  faHouse: IconDefinition = faHouse;
  faEnvelope: IconDefinition = faEnvelope;
  faPhone: IconDefinition = faPhone;
  faThumbsUp: IconDefinition = faThumbsUp;
  title : string = '';
  modalPreview : boolean = false; 
  isProfileLoaded: boolean = true;
  arePostsLoaded : boolean = true;
  constructor(private route: ActivatedRoute,
              private userServ : UsersService) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getUserPost();
  }

  getUserId(): string | null {
    const id = this.route.snapshot.paramMap.get('id');
    return id;
  }

  closeModal(e: any){
    let elementClicked = e.srcElement.localName
    if(elementClicked != 'img') this.modalPreview = false;
    
  }

  getUserPost(): void {
    const id = this.getUserId();
    this.userServ.getUserPost(id)
      .subscribe(data => {
        if(data){
          this.arePostsLoaded = false;
          this.userPosts = data.data;
        }
      });
  }

  getUserProfile(): void {
    const id = this.getUserId();
    this.userServ.getUserDetail(id)
      .subscribe(data => {
        if(data){
          this.isProfileLoaded = false;
          this.userDetail = data;
        }
      });
  }

  openModal(image : string){
    this.modalPreview = true;
    this.modalImage = image;
  }

}
