import * as moment from 'moment';

import { BaseModel } from './Base';
import { User } from './User';

export class Chat extends BaseModel {

  constructor(
    public id: number,
    public senderId: number,
    public sender: User,
    public receiverId: number,
    public receiver: User,
    public message: string,
    public read: boolean,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

}
