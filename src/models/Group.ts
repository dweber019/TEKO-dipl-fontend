import * as moment from 'moment';

import { BaseModel } from './Base';

export class Group extends BaseModel {

  constructor(
    public id: number,
    public name: string,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

}
