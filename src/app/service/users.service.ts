import { Injectable,inject } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {of,tap} from 'rxjs';
import {Channels} from '../channels';
import {User} from "../user";
import { parseUser } from '../helpers/user-helper';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);

  private loggedInUser = JSON.parse(this.authService.getCurrentuser() || '{}');  ;
  private currentUser = parseUser(this.loggedInUser);

  isLoggedin(){
    if (sessionStorage.getItem('currentUser')){
      return true;
    }else{
      return false;
    }
  }


  getUsersFromChannel(channelId:string){
    return this.http.get<Channels>(`http://localhost:3000/api/getUsersFromChannel/${channelId}?token=${this.currentUser._id}`);
  }

  updateRole(user: User, role:string){
    return this.http.put<Channels>(`http://localhost:3000/api/updateRole/${user._id}?token=${this.currentUser._id}`, { role });
  }

  removeUser(user:any){
    return this.http.delete<User>(`http://localhost:3000/api/removeUser/${user._id}?token=${this.currentUser._id}`);
  }

  createNewUser(user:any, createNewUserEmail: string, password:string, username:string){
    return this.http.post<User>('http://localhost:3000/api/createNewUser', {user: user, createNewUserEmail, password, username});
  }

  addExistedUserToGroup(user:any, groupId: string){
    return this.http.put<User>(`http://localhost:3000/api/addExistedUserToGroup/${user._id}?token=${this.currentUser._id}`, {groupId});
  }

  removeUserFromGroup(user:any, groupId: string){
    return this.http.put<User>(`http://localhost:3000/api/removeUserFromGroup/${user._id}?token=${this.currentUser._id}`, {groupId});
  }

  getGlobalUsers(){
    return this.http.get<User>(`http://localhost:3000/api/getAllUsers?token=${this.currentUser._id}`);
      
  }

  
}
