import * as moment from 'moment';

import { BaseModel } from './Base';
import { UserType } from './UserType';

export {
  UserType
}

export class User extends BaseModel {

  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public type: UserType,
    public calenderToken: string,
    public picture: string,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

}
