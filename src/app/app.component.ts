import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { User } from './user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chat-system';

  private router = inject(Router);
  private authServices = inject(AuthService);
  private location = inject(Location);
  // private routerLink = inject(RouterLink);

  items: string[] = ['home', 'groups','users', 'login', 'logoutString'];
  activeItem: string | null = null;
  home: boolean = false;
  groups: boolean = false;
  login: boolean = false;
  profile: boolean = false;
  users: boolean = false;

  get currentuser(): any {
    return this.authServices.getCurrentuser();
  }
 

  get isLoggedin(): boolean {
    return this.authServices.isLoggedin();
  }

  ngOnInit() {
    const url = this.location.path();
    
    if (url === '/home') {
      this.home = true;
    }

    if (url === '/groups') {
      this.groups = true;
    }
    if (url === '/profile') {
      this.profile = true;
    }
    if (url === '/users') {
      this.users = true;
    }
   
  }

  logout(event: any) {
    this.authServices.logout(event);
  }

  setActive(nameTapMenu: string): void {
    this.activeItem = nameTapMenu
  }
}
