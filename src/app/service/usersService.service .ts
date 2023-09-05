import { Injectable,inject } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {of,tap} from 'rxjs';
import {Channels} from '../channels';
import {User} from "../user";


@Injectable({
  providedIn: 'root'
})
export class usersService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  isLoggedin(){
    if (sessionStorage.getItem('currentUser')){
      return true;
    }else{
      return false;
    }
  }


  getUsersChannel(channelId:number){
    return this.http.post<Channels>('http://localhost:3000/api/getUsersChannel', {channelId: channelId});
  }

  promoteUserToAdmin(user:any, promoteUserEmail: string, groupIdSelected:number){
    return this.http.post<User>('http://localhost:3000/api/promoteUserAsAdmin', {user: user, promoteUserEmail, groupIdSelected});
  }

  removeUser(user:any, removeUserEmail: string){
    return this.http.post<User>('http://localhost:3000/api/removeUser', {user: user, removeUserEmail});
  }

  createNewUser(user:any, createNewUserEmail: string, password:string, username:string){
    return this.http.post<User>('http://localhost:3000/api/createNewUser', {user: user, createNewUserEmail, password, username});
  }

  
}
