import * as moment from 'moment';

import { BaseModel } from './Base';
import { User } from './User';

export class GradeUser extends BaseModel {

  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public type: string,
    public calenderToken: string,
    public picture: string,
    public grade: number,
    public gradeDate: moment.Moment,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

  public toUser(): User {
    return new User(
      this.id,
      this.firstname,
      this.lastname,
      this.type,
      this.calenderToken,
      this.picture,
      this.createdAt,
      this.updatedAt,
    );
  }

}