import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../service/auth.service';
import { GroupsService } from '../../service/groups.service';

import { Groups } from 'src/app/groups';
import { parseGroup } from 'src/app/helpers/group-helper';
import { User } from 'src/app/user';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent  implements OnInit {
  private authService = inject(AuthService);
  private groupsService = inject(GroupsService);
  
  showAddForm: boolean = false;
  canCreateGroups: boolean = false;
  groups: Groups[] = [];
  errormsg = "";
  newGroupName: string = "";
  currentuser:any = new User();

  ngOnInit() {
    this.currentuser = JSON.parse(this.authService.getCurrentuser() || '{}');
    this.canCreateGroups = !this.currentuser.roles.includes('user');
    this.fetchAllGroups()
  }

  showAddGroupForm() {
    this.showAddForm = true;
  }

  cancelAdd() {
    this.showAddForm = false;
  }

  addNewGroup() {
    this.groupsService.createGroup(this.newGroupName).subscribe({
      next: (data: any) => {
        this.showAddForm = false;
        this.groups.push(parseGroup(data));
      },
      error: (data: any) => console.log(data?.error)
    });
  }
  
  removeGroup(group: Groups) {
    const response = confirm("Do you really want to delete this group?");
    if (response) {
      this.groupsService.removeGroup(group._id).subscribe({
        next: (data: any) => {
          const index = this.groups.indexOf(group);
          if (index !== -1) {
            this.groups.splice(index, 1);
          }
        },
        error: (data: any) => console.log(data?.error)
      });
    }
  }

  requestAccess(group: Groups) {
    alert("Coming soon!");
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