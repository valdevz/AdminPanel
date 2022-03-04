import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  title : string = 'Usuarios';
  isLoading : boolean = true;
  users! : object;
  constructor(private userServ : UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userServ.getUsers().subscribe({
      next : data => {
        if(data){
          this.isLoading = false;
          this.users = data.data;
          console.log(this.users)
        }
      },
      error : err => {
        console.log(err)
      }
    })
  }

}
