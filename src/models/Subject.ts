import * as moment from 'moment';

import { BaseModel } from './Base';
import { Status } from './Status';

export class Subject extends BaseModel {

  constructor(
    public id: number,
    public name: string,
    public archived: boolean,
    public status: Status,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

}
