import * as moment from 'moment';

import { BaseModel } from './Base';
import { Status } from './Status';

export class Task extends BaseModel{

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public dueDate: moment.Moment,
    public status: Status,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

}
