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
export class ChannelsService {
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


  getChannels(groupId:string){
    return this.http.get<Channels>(`http://localhost:3000/api/getChannels/${groupId}?token=${this.currentUser._id}`);
  }
  
  addChannelToGroup(groupId:string, name: string){
    return this.http.post<Channels>(`http://localhost:3000/api/addChannelToGroup?token=${this.currentUser._id}`, {groupId, name});
  }

  removeUserFromChannel(user:any, removeUserInChannelEmail:string, channelIdSelected:string){
    return this.http.post<Channels>('http://localhost:3000/api/removeUserFromChannel', {user: user, removeUserInChannelEmail, channelIdSelected});
  }

  removeChannel(channelId:string){
    return this.http.delete<Channels>(`http://localhost:3000/api/removeChannel/${channelId}?token=${this.currentUser._id}`);
  }
 
}
