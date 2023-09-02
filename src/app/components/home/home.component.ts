import { Component, OnInit,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GroupsService } from '../../service/groups.service';
import { ChannelsService } from '../../service/channels.service ';
import { usersChannelsService } from '../../service/usersChannels.service ';
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
  home: string = 'Home page';

  errormsg = "";
  currentuser:any = new User();
  usersChannelArray:any = new User();

  groupsArray:any = new Groups();
  
  channelsArray:any = new Groups();
  newGroupName:string = ''

  public show:boolean = false;
  public buttonName:any = 'Show';
  
  
  private router = inject(Router)
  private GroupsService = inject(GroupsService);
  private ChannelsService = inject(ChannelsService);
  private usersChannelsService = inject(usersChannelsService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.currentuser = JSON.parse(this.authService.getCurrentuser() || '{}');
    this.fetchGroups()
  }

  toggle() {
    this.show = !this.show;

    // Change the name of the button.
    if(this.show){  
      this.buttonName = "Hide";
    }else{
      this.buttonName = "Show";
    }
  }

  createGroup(event:any){
    event.preventDefault();
    this.GroupsService.createGroup(this.currentuser, this.newGroupName).subscribe({
      next:
        (data: any)=>{
          this.toggle();//hide window to create groups
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

  fetchGroups(){
    console.log("at get groups, before request aaaaaaaaa", this.currentuser);
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
    this.usersChannelsService.getUsersChannel(channelId).subscribe({
      next:
        (data: any)=>{
          if (Array.isArray(data)) {
            this.usersChannelArray = data.map((usersChannelData: any) => new User(usersChannelData.id, usersChannelData.username));
          } else {
            this.errormsg = "Invalid data format";
          }
      
      error:
        this.errormsg = "There is a problem with the channels";
      }
    })
  }

}
