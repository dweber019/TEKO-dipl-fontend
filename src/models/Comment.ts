import * as moment from 'moment';

import { BaseModel } from './Base';
import { User } from './User';

export class Comment extends BaseModel {

  constructor(
    public id: number,
    public message: string,
    public user: User,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

}
