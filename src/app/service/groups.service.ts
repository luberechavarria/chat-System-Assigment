import { Injectable,inject } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {of,tap} from 'rxjs';
import {Groups} from '../groups';
import { parseUser } from "../helpers/user-helper";
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {
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


  getAllGroups(){
    return this.http.get<Groups>(`http://localhost:3000/api/getAllGroups`);
  }

  getMyGroups(){
    return this.http.get<Groups>(`http://localhost:3000/api/getMyGroups?token=${this.currentUser._id}`);
  }

  createGroup(newGroupName:string){
    return this.http.post<Groups>(`http://localhost:3000/api/createGroup?token=${this.currentUser._id}`, {name: newGroupName});
  }
  
  addExistedUserToGroup(user:any, userAddToGroupEmail: string, groupname:string){
    return this.http.post<Groups>('http://localhost:3000/api/addExistedUserToGroup', {user: user, userAddToGroupEmail, groupname});
  }

  removeGroup(groupId: string){
    return this.http.delete<Groups>(`http://localhost:3000/api/removeGroup/${groupId}?token=${this.currentUser._id}`);
  }

  removeUserFromGroup(user:any, removeUserInGroupEmail:string, groupIdSelected:string){
    return this.http.post<any>('http://localhost:3000/api/removeUserFromGroup', {user: user, removeUserInGroupEmail, groupIdSelected});
  }

}
