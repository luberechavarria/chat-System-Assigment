import { Component ,inject,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import {User} from '../../user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  currentuser:User = new User();
  username:string = "";
  email:string = "";
  pwd:string = "";

  private authService = inject(AuthService);

  ngOnInit() {
    this.currentuser = JSON.parse(this.authService.getCurrentuser() || '{}');
    this.username = this.currentuser.username;
    this.email = this.currentuser.email
    console.log(this.currentuser);
  }

  editProfile(event:any){
    event.preventDefault();
    this.currentuser = new User(this.username,this.email)
    this.authService.setCurrentuser(this.currentuser);
  }
}
