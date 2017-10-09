import * as moment from 'moment';

import { BaseModel } from './Base';
import { User } from './User';
import { Subject } from './Subject';

export class Grade extends BaseModel{

  constructor(
    public id: number,
    public name: string,
    public archived: boolean,
    public teacher: User,
    public grade: number,
    public gradeDate: moment.Moment,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

  public toSubject(): Subject {
    return new Subject(
      this.id,
      this.name,
      this.archived,
      null,
      this.teacher,
      this.createdAt,
      this.updatedAt
    )
  }

}
