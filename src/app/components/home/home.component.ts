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
  channelIdSelected = 0; // Keep highLight the channelIdSelected selected
  userIdSelected = 0; // Keep highLight the userIdSelected selected

  groups:Groups[] = [];

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
  public buttonName:string = 'show';

  public show1:boolean = false;
  public buttonName1:string = 'show1';

  public show2:boolean = false;
  public buttonName2:string = 'show2';

  public show3:boolean = false;
  public buttonName3:string = 'show3';

  public show4:boolean = false;
  public buttonName4:string = 'show4';

  public show5:boolean = false;
  public buttonName5:string = 'show5';

  public show6:boolean = false;
  public buttonName6:string = 'show6';

  public show7:boolean = false;
  public buttonName7:string = 'show7';

  public show8:boolean = false;
  public buttonName8:string = 'show8';

  public show9:boolean = false;
  public buttonName9:string = 'show9';

  promoteUserAsAdmin:string = '';

  removeUserEmail:string = '';
  
  createNewUserEmail:string = '';
  password:string = '';
  username:string = '';

  userAddToGroupEmail:string = '';
  groupname:string = '';

  newChannelName:string = '';
  
  removeGroupName:string = '';

  removeUserInGroupEmail:string = '';

  removeUserInChannelEmail:string = '';

  removeChannelName:string = '';
  
  
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

   // hide and show window showRemoveChatUser.
   showRemoveUser() {
    this.show2 = !this.show2;
    if(this.show2){  
      this.buttonName2 = "Hide2";
    }else{
      this.buttonName2 = "Show2";
    }
  }

  // hide and show window create new user.
  showCreateNewUserBtn() {
    this.show3 = !this.show3;
    if(this.show3){  
      this.buttonName3 = "Hide3";
    }else{
      this.buttonName3 = "Show3";
    }
  }

  // hide and show window add existing user to group.
  showAddUserToGroupBtn() {
    this.show4 = !this.show4;
    if(this.show4){  
      this.buttonName4 = "Hide4";
    }else{
      this.buttonName4 = "Show4";
    }
  }

  // hide and show window add channel to group.
  showAddChannelToGroupBtn() {
    this.show5 = !this.show5;
    if(this.show5){  
      this.buttonName5 = "Hide5";
    }else{
      this.buttonName5 = "Show5";
    }
  }

  // hide and show window remove group.
  showRemoveGroup() {
    this.show6 = !this.show6;
    if(this.show6){  
      this.buttonName6 = "Hide6";
    }else{
      this.buttonName6 = "Show6";
    }
  }

  // hide and show window remove user from group.
  showRemoveUserFromGroup() {
    this.show7 = !this.show7;
    if(this.show7){  
      this.buttonName7 = "Hide7";
    }else{
      this.buttonName7 = "Show7";
    }
  }

  // hide and show window remove user from channel.
  showRemoveUserFromChannel() {
    this.show8 = !this.show8;
    if(this.show8){  
      this.buttonName8 = "Hide8";
    }else{
      this.buttonName8 = "Show8";
    }
  }

  // hide and show window remove  channel from group.
  showRemoveChannel() {
    this.show9 = !this.show9;
    if(this.show9){  
      this.buttonName9 = "Hide9";
    }else{
      this.buttonName9 = "Show9";
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
          this.showPromoteUserAdminBtn();//hide window to create to promote user as admin
          if (data){
            console.log("promoteUserToAdmin", data)
            //successful, send message here to show somewhere, I got user for in case I need
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem promoting this user to admin";
      }
    })
  }

  removeUser(event:any){
    this.usersService.removeUser(this.currentuser, this.removeUserEmail).subscribe({
      next:
        (data: any)=>{
          this.showRemoveUser();
          if (data.login == true){
            console.log(" removeUser user", data);
            //successful, send message here to show somewhere, I got user for in case I need
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem promoting this user to admin";
      }
    })
  }

  removeGroup(event:any){
    this.GroupsService.removeGroup(this.currentuser, this.removeGroupName).subscribe({
      next:
        (data: any)=>{
          this.showRemoveGroup();
          if (data){
            console.log(" removeGroup", data);
            this.groupsArray = data.map((groupData: any) => new Groups(groupData.id, groupData.name));
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem removing group";
      }
    })
  }

  removeChannel(event:any){
    this.ChannelsService.removeChannel(this.currentuser, this.removeChannelName, this.groupIdSelected).subscribe({
      next:
        (data: any)=>{
          this.showRemoveChannel();
          if (data){
            console.log(" removeChannel", data);
            this.channelsArray = data.map((channelData: any) => new Channels(channelData.id, channelData.name));
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem removing channel";
      }
    })
  }

  removeUserFromGroup(event:any){
    this.GroupsService.removeUserFromGroup(this.currentuser, this.removeUserInGroupEmail, this.groupIdSelected).subscribe({
      next:
        (data: any)=>{
          this.showRemoveUserFromGroup();
          if (data){
            console.log(" removeUserFromGroup", data);
            //successful, send message here to show somewhere, I got user for in case I need
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem removing user from group";
      }
    })
  }

  removeUserFromChannel(event:any){
    this.ChannelsService.removeUserFromChannel(this.currentuser, this.removeUserInChannelEmail, this.channelIdSelected).subscribe({
      next:
        (data: any)=>{
          this.showRemoveUserFromChannel();
          if (data){
            console.log(" removeUserFromChannel", data);
            this.arrayUsersChannels = data.map((usersChannelData: any) => new User(usersChannelData.id, usersChannelData.username));
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem removing user from channel";
      }
    })
  }
  
  createNewUser(event:any){
    console.log(" removeUserFromChannel");
    this.usersService.createNewUser(this.currentuser, this.createNewUserEmail, this.password, this.username).subscribe({
      next:
        (data: any)=>{
          this.showCreateNewUserBtn();
          if (data){
            console.log(" createNewUser user", data);
            //successful, send message here to show somewhere, I got user for in case I need
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem creating new User";
      }
    })
  }


  addExistedUserToGroup(event:any){
    this.GroupsService.addExistedUserToGroup(this.currentuser, this.userAddToGroupEmail, this.groupname).subscribe({
      next:
        (data: any)=>{
          this.showAddUserToGroupBtn();
          if (data){
            console.log(" addExistedUserToGroupr", data);
            //successful, send message here to show somewhere
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem to add user to group";
      }
    })
  }

  addChannelToGroup(event:any){
    this.ChannelsService.addChannelToGroup(this.currentuser, this.groupIdSelected, this.newChannelName).subscribe({
      next:
        (data: any)=>{
          this.showAddChannelToGroupBtn();
          if (data){
            console.log(" addChannelToGroup", data);
            this.channelsArray = data.map((channelData: any) => new Channels(channelData.id, channelData.name));
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem to add channel to group";
      }
    })
  }

  fetchGroups(){
    this.GroupsService.getGroups({user: this.currentuser}).subscribe({
      next:
        (data: any)=>{
          if (Array.isArray(data)) {
            console.log("groups but for now products", data)
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
    this.channelIdSelected = channelId;
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

  highLightChannelUsers(usersChannel: number){
    this.userIdSelected = usersChannel;
  }

}
