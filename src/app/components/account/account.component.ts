import { Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../../car';
import { DataService } from '../../service/data.service';
import { AuthService } from '../../service/auth.service';
import {User} from "../../user";
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{
  currentuser:User = new User();
  

  private authService = inject(AuthService);

  ngOnInit() {
    this.currentuser = JSON.parse(this.authService.getCurrentuser() || '{}');
    console.log(this.currentuser);
  }
  
}
