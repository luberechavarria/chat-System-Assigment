import {Chat} from '../chat';

export function parseChat(chat: any): Chat {
    return new Chat(
      chat._id,
      chat.username,
      chat.userId,
      chat.message,
      chat.channelId,
      chat.createdAt,
    );
  }