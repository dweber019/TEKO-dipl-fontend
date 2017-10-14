import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Chat } from './../../models/Chat';
import { UserProvider } from './users';

export {
  Chat,
};

@Injectable()
export class ChatProvider {

  public static RESOURCE = 'chats';

  public static toModel(json: Chat): Chat {
    return new Chat(
      json.id,
      json.senderId,
      json.sender && UserProvider.toModel(json.sender),
      json.receiverId,
      json.receiver && UserProvider.toModel(json.receiver),
      json.message,
      json.read,
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
