import * as moment from 'moment';

import { BaseModel } from './Base';

export class User extends BaseModel {

  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public type: string,
    public calenderToken: string,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

}
