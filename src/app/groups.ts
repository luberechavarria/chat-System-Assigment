export class Groups {
  constructor(
    public _id: string = '',
    public name: string = '',
    public userAdmins: string[] = [],
    public joinRequesters: string[] = [],
  ) {}
}
