import {User} from '../user';

export function parseUser(user: any): User {
    return new User(
      user._id,
      user.username,
      user.email,
      user.login,
      user.pwd,
      user.roles,
      user.groups,
      user.avatar
    );
  }