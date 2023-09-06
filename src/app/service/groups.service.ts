import { Injectable,inject } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {of,tap} from 'rxjs';
import {Groups} from '../groups';
import {User} from "../user";


@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  isLoggedin(){
    if (sessionStorage.getItem('currentUser')){
      return true;
    }else{
      return false;
    }
  }


  getGroups(user:any){
    return this.http.post<Groups>('http://localhost:3000/api/getGroups', user);
  }

  createGroup(user:any, newGroupName:string){
    return this.http.post<Groups>('http://localhost:3000/api/createGroup', {user: user, newGroupName: newGroupName});
  }
  
  addExistedUserToGroup(user:any, userAddToGroupEmail: string, groupname:string){
    return this.http.post<User>('http://localhost:3000/api/addExistedUserToGroup', {user: user, userAddToGroupEmail, groupname});
  }

  removeGroup(user:any, groupname:string){
    return this.http.post<User>('http://localhost:3000/api/removeGroup', {user: user, groupname});
  }

  removeUserFromGroup(user:any, removeUserInGroupEmail:string, groupIdSelected:number){
    return this.http.post<User>('http://localhost:3000/api/removeUserFromGroup', {user: user, removeUserInGroupEmail, groupIdSelected});
  }

}
