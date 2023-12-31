import { Injectable,inject } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {of,tap} from 'rxjs';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  isLoggedin(){
    if (sessionStorage.getItem('currentUser')){
      return true;
    }else{
      return false;
    }
  }

  login(username:string,pwd:string){
    return this.http.post<User>('http://localhost:3000/api/login', { username, password: pwd});
  }

  createNewUser(username:string,pwd:string){
    return this.http.post<User>('http://localhost:3000/api/createNewUser', { username, password: pwd});
  }

  logout(event:any){
    sessionStorage.removeItem('currentUser');
    this.router.navigateByUrl('');
  }

  setCurrentuser(newuser:any){
    sessionStorage.setItem('currentUser',JSON.stringify(newuser));
  }

  getCurrentuser(){
    return sessionStorage.getItem('currentUser');
  }
  
}
