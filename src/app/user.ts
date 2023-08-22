export class User {
  username:string;
  email:string;
  login: boolean;
  pwd:string;
  user: boolean;
  superAdmin: boolean;
  groupAdmin: boolean;
 
  avatar?:string;
  constructor(
    username:string= '',
    email:string= '',
    login:boolean = false,
    pwd:string= '',
    user:boolean = true,
    superAdmin:boolean = false,
    groupAdmin:boolean = false,
    avatar:string= ""
  ){
    this.username = username;
    this.email = email;
    this.login = login;
    this.pwd=pwd;
    this.user = user;
    this.superAdmin = superAdmin;
    this.groupAdmin = groupAdmin;
    this.avatar = avatar
  }
}
