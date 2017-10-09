import * as moment from 'moment';

import { BaseModel } from './Base';
import { Status } from './Status';
import { Lesson } from './Lesson';
import { LessonType } from './LessonType';

export class Agenda extends BaseModel{

  constructor(
    public id: number,
    public name: string,
    public startDate: moment.Moment,
    public endDate: moment.Moment,
    public location: string,
    public room: string,
    public canceled: boolean,
    public type: LessonType,
    public subjectId: number,
    public status: Status,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

  public toLesson(): Lesson {
    return new Lesson(
      this.id,
      this.startDate,
      this.endDate,
      this.location,
      this.room,
      this.canceled,
      this.type,
      this.status,
      this.subjectId,
      this.createdAt,
      this.updatedAt,
    );
  }

}
