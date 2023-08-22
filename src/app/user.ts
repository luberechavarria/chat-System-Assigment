export class User {
   
  username:string;
  email:string;
  pwd:string;
  valid:boolean;
  avatar?:string;
  constructor(username:string='',email:string='',valid=false,pwd:string='',avatar:string=""){
     
    this.username = username;
    this.email = email;
    this.pwd=pwd;
    this.valid = valid;
    this.avatar = avatar
  }
}
