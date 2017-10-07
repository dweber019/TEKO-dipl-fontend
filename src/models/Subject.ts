import * as moment from 'moment';

import { BaseModel } from './Base';
import { Status } from './Status';
import { User } from './User';

export class Subject extends BaseModel {

  constructor(
    public id: number,
    public name: string,
    public archived: boolean,
    public status: Status,
    public teacher: User,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

}
