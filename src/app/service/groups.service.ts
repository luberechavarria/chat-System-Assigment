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
    return this.http.post<Groups>('http://localhost:3000/api/getGroups', {user: user, newGroupName: newGroupName});
  }
  
}
