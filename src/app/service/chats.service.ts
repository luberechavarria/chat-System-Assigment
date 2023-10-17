import { Injectable,inject } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {of,tap} from 'rxjs';
import { parseUser } from "../helpers/user-helper";
import { AuthService } from './auth.service';
import { Chat } from '../chat';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
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

  getChatsByChannelId(channelId: string){
    return this.http.get<Chat>(`http://localhost:3000/api/getChatsByChannelId/${channelId}?token=${this.currentUser._id}`);
  }

  sendMessage(chat:any){
    return this.http.post<Chat>(`http://localhost:3000/api/sendMessage?token=${this.currentUser._id}`, {...chat});
  }

}
