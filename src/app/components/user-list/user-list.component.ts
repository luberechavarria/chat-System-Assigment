import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../service/auth.service';
import { UsersService } from '../../service/users.service';

import {User} from '../../user';
import { parseUser } from 'src/app/helpers/user-helper';
import { Groups } from 'src/app/groups';
import { GroupsService } from '../../service/groups.service';
import { parseGroup } from 'src/app/helpers/group-helper';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent  implements OnInit {
  private authService = inject(AuthService);
  private usersService = inject(UsersService);
  private groupsService = inject(GroupsService);

  showGroupPermissions:boolean = false;
  selectedUser: any;
  errormsg = "";
  selectedRole: string = 'superAdmin';
  users: User[] = [];
  groups: Groups[] = [];

  ngOnInit() {
    this.fetchAllUsers();
    this.fetchAllGroups();
  }


  toggleGroupPermissions(user: User) {
    this.selectedUser = user;
    this.showGroupPermissions = true;
  }

  closeGroupPermissions() {
    this.showGroupPermissions = false;
  }
  
  removeUser(user: User) {
    const response = confirm("Do you really want to delete this user?");
    if (response) {
      this.usersService.removeUser(user).subscribe({
        next: (data: any) => {
          const index = this.users.indexOf(user);
          if (index !== -1) {
            this.users.splice(index, 1);
          }
        },
        error: (data: any) => console.log(data?.error)
      });
    }
  }

  updateUserRole(user: User, selectedRole: string) {
    this.showGroupPermissions = false;
    this.usersService.updateRole(user, selectedRole).subscribe({
      next: (data: any) => {
        
      },
      error: (data: any) => console.log(data?.error)
    });
  }

  addGroupToSelectedUser(user: User, groupId: string) {
    this.usersService.addExistedUserToGroup(user, groupId).subscribe({
      next: (data: any) => {
        const index = this.users.indexOf(user);
        if (index !== -1) {
          this.users[index].groups.push(groupId);
        }
      },
      error: (data: any) => console.log(data?.error)
    });
  }
  removeUserFromGroup(user: User, groupId: string) {
    this.usersService.removeUserFromGroup(user, groupId).subscribe({
      next: (data: any) => {
        const index = this.users.indexOf(user);
        if (index !== -1) {
          const groupIndex = this.users[index].groups.indexOf(groupId);
          if (groupIndex !== -1) {
            this.users[index].groups.splice(groupIndex, 1);
          }
        }
      },
      error: (data: any) => console.log(data?.error)
    });
  }
  fetchAllUsers(){
    this.usersService.getGlobalUsers().subscribe({
      next:
        (data: any)=>{
          if (Array.isArray(data)) {
            this.users = data.map((user: any) => parseUser(user));
            console.log('all-users', this.users);
          } else {
            this.errormsg = "Invalid data format";
          }
      
        },
      error: () => this.errormsg = "There was a problem when fetching the global users"
    })
  }

  fetchAllGroups(){
    this.groupsService.getAllGroups().subscribe({
      next:
        (data: any)=>{
          if (Array.isArray(data)) {
            this.groups = data.map((group: any) => parseGroup(group));
            console.log('all-groups', this.groups);
          } else {
            this.errormsg = "Invalid data format";
          }
      
        },
      error: () => this.errormsg = "There was a problem when fetching the global groups"
    })
  } 
}