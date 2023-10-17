import {Groups} from '../groups';

export function parseGroup(group: any): Groups {
    return new Groups(
      group._id,
      group.name,
      group.userAdmins,
      group.joinRequesters,
    );
  }