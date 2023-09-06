import { Injectable,inject } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {of,tap} from 'rxjs';
import {Channels} from '../channels';
import {User} from "../user";


@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  isLoggedin(){
    if (sessionStorage.getItem('currentUser')){
      return true;
    }else{
      return false;
    }
  }


  getChannels(groupId:number){
    return this.http.post<Channels>('http://localhost:3000/api/getChannels', {groupId: groupId});
  }
  
  addChannelToGroup(user:any, groupId:number, newChannelName: string){
    return this.http.post<User>('http://localhost:3000/api/addChannelToGroup', {user: user, groupId, newChannelName});
  }

  removeUserFromChannel(user:any, removeUserInChannelEmail:string, channelIdSelected:number){
    return this.http.post<User>('http://localhost:3000/api/removeUserFromChannel', {user: user, removeUserInChannelEmail, channelIdSelected});
  }

  removeChannel(user:any, channelname:string, groupId:number){
    return this.http.post<User>('http://localhost:3000/api/removeChannel', {user: user, channelname, groupId});
  }
 
}
