export class User {
  constructor(
    public id: string = '',
    public username: string = '',
    public email: string = '',
    public login: boolean = false,
    public pwd: string = '',
    public roles: string[] = [],
    public groups: number[] = [],
    public avatar: string = ""
  ) {}
}