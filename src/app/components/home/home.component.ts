import { Component, OnInit,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GroupsService } from '../../service/groups.service';
import { ChannelsService } from '../../service/channels.service ';
import { usersService } from '../../service/usersService.service ';
import {Groups} from "../../groups";
import {Channels} from "../../channels";
import {User} from "../../user";
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  groupIdSelected = 0; // Keep highLight the group selected


  errormsg = "";
  currentuser:any = new User();
  arrayUsersChannels:any = new User();

  groupsArray:any = new Groups();
  
  channelsArray:any = new Groups();
  newGroupName:string = '';

  // selected group in menu panel
  menuItems: string[] = this.groupsArray;
  selectedMenuItem: string | null = null;

  public show:boolean = false;
  public buttonName:any = 'show';

  public show1:boolean = false;
  public buttonName1:any = 'show1';

  promoteUserAsAdmin:any = '';
  
  
  private router = inject(Router)
  private GroupsService = inject(GroupsService);
  private ChannelsService = inject(ChannelsService);
  private usersService = inject(usersService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.currentuser = JSON.parse(this.authService.getCurrentuser() || '{}');
    this.fetchGroups()
  }

  // hide and show window Create group.
  showCreateGroupBtn() {
    this.show = !this.show;
    if(this.show){  
      this.buttonName = "Hide";
    }else{
      this.buttonName = "Show";
    }
  }

  // hide and show window Promote user Admin.
  showPromoteUserAdminBtn() {
    this.show1 = !this.show1;
    if(this.show1){  
      this.buttonName1 = "Hide1";
    }else{
      this.buttonName1 = "Show1";
    }
  }

  createGroup(event:any){
    event.preventDefault();
    this.GroupsService.createGroup(this.currentuser, this.newGroupName).subscribe({
      next:
        (data: any)=>{
          this.showCreateGroupBtn();//hide window to create groups
          if (Array.isArray(data)) {
            this.groupsArray = data.map((groupData: any) => new Groups(groupData.id, groupData.name));
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem with the groups";
      }
    })
  }

  promoteUserToAdmin(event:any){
 
    this.usersService.promoteUserToAdmin(this.currentuser, this.promoteUserAsAdmin, this.groupIdSelected).subscribe({
      next:
        (data: any)=>{
          console.log(" promoteUserToAdmin user", data);
          this.showPromoteUserAdminBtn();//hide window to create to promote user as admin
          if (data.login == true){
            //successful, send message here to show somewhere, I got user for in case I need
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem promoting this user to admin";
      }
    })
  }

  fetchGroups(){
    this.GroupsService.getGroups({user: this.currentuser}).subscribe({
      next:
        (data: any)=>{
          if (Array.isArray(data)) {
            this.groupsArray = data.map((groupData: any) => new Groups(groupData.id, groupData.name));
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem with the groups";
      }
    })
  } 

  fetchChannels(groupId: number){
    console.log("at get fetchChannels, before request");
    this.groupIdSelected = groupId;
    this.ChannelsService.getChannels(groupId).subscribe({
      next:
        (data: any)=>{
          if (Array.isArray(data)) {
            this.channelsArray = data.map((channelData: any) => new Channels(channelData.id, channelData.name));
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem with the channels";
      }
    })
  }

  fetchUsersChannel(channelId: number){
    console.log("at get fetchChannels, before request");
    this.usersService.getUsersChannel(channelId).subscribe({
      next:
        (data: any)=>{
          if (Array.isArray(data)) {
            this.arrayUsersChannels = data.map((usersChannelData: any) => new User(usersChannelData.id, usersChannelData.username));
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem with the channels";
      }
    })
  }

}
