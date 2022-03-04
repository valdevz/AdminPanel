import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import  apiKeys  from 'keys'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  env= environment;
  constructor(private http : HttpClient) {}
  getUsers(): Observable<any> {
    return this.http.get(this.env.usersApi, { 
      responseType: 'json' ,
      headers: {
        'app-id': apiKeys.users
      } 
    });
  }
  getUserDetail(id:string | null) : Observable<any> {
    return this.http.get(this.env.usersApi + `/${id}`, { 
      responseType: 'json' ,
      headers: {
        'app-id': apiKeys.users
      } 
    });
  }
  getUserPost(id: string | null) : Observable<any> {
    return this.http.get(this.env.usersApi + `/${id}/post`, {
      responseType : 'json',
      headers : {
        'app-id' : apiKeys.users
      }
    })
  }
}
