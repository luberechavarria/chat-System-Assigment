import { Component,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import {User} from "../../user";
import {Router} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { parseUser } from 'src/app/helpers/user-helper';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  errormsg = "";

 
  newuser:User = new User();
  username:string = "";
  pwd:string = "";
  loggedin:boolean = false;
  
  private router = inject(Router);
  private authService = inject(AuthService);
  
  ngOnInit() {
 
  }
  
  signin(event:any){
    console.log("at signin");
    event.preventDefault();
    this.authService.login(this.username,this.pwd).subscribe({
      next:
        (data)=>{
          console.log(data)
          
          if (data.login == true){
            this.newuser = new User(
              data._id,
              data.username,
              data.email,
              data.login,
              data.pwd,
              data.roles,
              data.groups,
              data.avatar
          )
            this.authService.setCurrentuser(this.newuser);
            this.router.navigate(['/home']);
          }else{
           
            this.errormsg = "There is a problem with the credentials";
          }
      
          
        },
      error: () => this.errormsg = "There is a problem with the credentials"
      
   
  })

  }

  signup(event:any){
    console.log("at signup");
    event.preventDefault();
    this.authService.createNewUser(this.username,this.pwd).subscribe({
      next:
        (data: User)=>{
          this.newuser = parseUser({...data, login: true});
          this.authService.setCurrentuser(this.newuser);
          this.router.navigate(['/home']);      
        },
      error: (data: any) => {
        console.log(data);
        this.errormsg = data?.error?.message || 'Unknown error';
      }
  })

  }
}
