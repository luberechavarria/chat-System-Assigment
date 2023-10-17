export class User {
  constructor(
    public _id: string = '',
    public username: string = '',
    public email: string = '',
    public login: boolean = false,
    public pwd: string = '',
    public roles: string[] = [],
    public groups: string[] = [],
    public avatar: string = ""
  ) {}
}