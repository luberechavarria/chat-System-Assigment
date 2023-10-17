import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GroupsService } from '../../service/groups.service';
import { ChannelsService } from '../../service/channels.service';
import { UsersService } from '../../service/users.service';
import { ChatService } from '../../service/chats.service';
import {Groups} from "../../groups";
import {Channels} from "../../channels";
import {Chat} from "../../chat";
import {User} from "../../user";
import { AuthService } from '../../service/auth.service';
import { parseChat } from 'src/app/helpers/chat-helper';
import { io } from 'socket.io-client';
import { SocketService } from 'src/app/service/socket.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  @ViewChild('chatContent', { static: false }) private chatContent!: ElementRef | undefined;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  // Function to scroll to the bottom of the chat content
  private scrollToBottom(): void {
    if (this.chatContent) {
      try {
        this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
      } catch (err) {
        console.log(err);
      };
    }
  }

  groupIdSelected = ''; // Keep highLight the group selected
  channelIdSelected = ''; // Keep highLight the channelIdSelected selected
  groups:Groups[] = [];

  errormsg = "";
  currentuser:any = new User();

  groupsArray:Groups[] = [];
  
  channelsArray:any = new Groups();
  newGroupName:string = '';

  // selected group in menu panel
  menuItems: Groups[] = this.groupsArray;
  selectedMenuItem: string | null = null;

  public show:boolean = false;
  public buttonName:string = 'show';

  public show5:boolean = false;
  public buttonName5:string = 'show5';

  public show9:boolean = false;
  public buttonName9:string = 'show9';

  public canCreateGroups:boolean = false;

  userAddToGroupEmail:string = '';
  groupname:string = '';

  newChannelName:string = '';
  
  removeGroupName:string = '';

  removeUserInGroupEmail:string = '';

  removeUserInChannelEmail:string = '';

  removeChannelName:string = '';
  
  
  private router = inject(Router)
  private groupsService = inject(GroupsService);
  private channelsService = inject(ChannelsService);
  private usersService = inject(UsersService);
  private chatService = inject(ChatService);
  private authService = inject(AuthService);
  private socket = inject(SocketService);
  // constructor(private socket: Socket) {}
  // constructor(private socket: Socket) {
  //   // Your component logic here
  // }
  // chat
  newMessage: string = '';
  chats: Chat[] = [];

  
  ngOnInit() {
    this.currentuser = JSON.parse(this.authService.getCurrentuser() || '{}');
    this.canCreateGroups = !this.currentuser.roles.includes('user');
    this.fetchGroups();
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

  // hide and show window add channel to group.
  showAddChannelToGroupBtn() {
    this.show5 = !this.show5;
    if(this.show5){  
      this.buttonName5 = "Hide5";
    }else{
      this.buttonName5 = "Show5";
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
    this.groupsService.createGroup(this.newGroupName).subscribe({
      next:
        (data: Groups)=>{
          this.showCreateGroupBtn();//hide window to create groups
          if (data) {
            this.groupsArray.push(new Groups(data._id, data.name));
          } else {
            this.errormsg = "Invalid data format";
          }
      
        },
        error: () => this.errormsg = "There is a problem with the groups"
    })
  }

  sendMessage(){
    const chat = {
      message: this.newMessage,
      channelId: this.channelIdSelected,
      username: this.currentuser.username
    }
    this.chatService.sendMessage(chat).subscribe({
      next:
        (data: any)=>{
          if (data) {
            this.newMessage = '';
            // Chat is comming from sockets, so if I
            // uncomment the folloing line, the message will be duplicated
            // this.chats.push(parseChat(data));
          } else {
            this.errormsg = "Invalid data format";
          }
      
        },
        error: () => this.errormsg = "There is a problem with the groups"
    })
  }

  removeChannel(){
    this.channelsService.removeChannel(this.channelIdSelected).subscribe({
      next:
        (data: any)=>{
          if (data){
            this.channelsArray = this.channelsArray.filter((channel: Channels) => channel._id !== this.channelIdSelected);
            this.channelIdSelected = '';
          } else {
            this.errormsg = "Invalid data format";
          }
      
        },
        error: () => this.errormsg = "There is a problem removing channel"
    })
  }

  addChannelToGroup(event:any){
    this.channelsService.addChannelToGroup(this.groupIdSelected, this.newChannelName).subscribe({
      next:
        (data: any)=>{
          this.showAddChannelToGroupBtn();
          if (data){
            console.log(" addChannelToGroup", data);
            this.channelsArray.push(new Channels(data._id, data.name));
          } else {
            this.errormsg = "Invalid data format";
          }
      
        },
        error: () => this.errormsg = "There is a problem to add channel to group"
    })
  }

  fetchGroups(){
    this.groupsService.getMyGroups().subscribe({
      next:
        (data: any)=>{
          if (Array.isArray(data)) {
            console.log("my current accessible groups", data)
            this.groupsArray = data.map((groupData: any) => new Groups(groupData._id, groupData.name));
          } else {
            this.errormsg = "Invalid data format";
          }
      
        },
        error: () => this.errormsg = "There is a problem with the groups"
    })
  } 

  initSockets(channelsData:Channels[]){
    for (let {_id} of channelsData ){
      // Listen for messages from the server
      console.log("subscribing to socket: ", _id);
      this.socket.fromEvent(_id).subscribe((data:any) => {
        console.log("received from socket");
        if(this.channelIdSelected === _id){

          this.chats.push(data);
          console.log('Received message from server:', data);
        }
      });
    }
  }


  fetchChannels(groupId: string){
    console.log("at get fetchChannels, before request");
    this.groupIdSelected = groupId;
    this.channelsService.getChannels(groupId).subscribe({
      next:
        (data: any)=>{
          if (Array.isArray(data)) {
            this.channelsArray = data.map((channelData: any) => new Channels(channelData._id, channelData.name));
            this.initSockets(this.channelsArray);
          } else {
            this.errormsg = "Invalid data format";
          }
      
        },
        error: () => this.errormsg = "There is a problem with the channels"
    })
  }

  fetchChats (channel: Channels) {
    this.channelIdSelected = channel._id;
    this.chatService.getChatsByChannelId(this.channelIdSelected).subscribe({
      next:
        (data: any)=>{
          if (Array.isArray(data)) {
            this.chats = data.map((chat: any) => parseChat(chat));
          } else {
            this.errormsg = "Invalid data format";
          }
      
        },
        error: () => this.errormsg = "There is a problem with the chats"
    })
  }

}
