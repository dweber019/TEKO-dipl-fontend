import * as moment from 'moment';

import { BaseModel } from './Base';
import { Status } from './Status';
import { LessonType } from './LessonType';

export {
  LessonType
}

export class Lesson extends BaseModel {

  constructor(
    public id: number,
    public startDate: moment.Moment,
    public endDate: moment.Moment,
    public location: string,
    public room: string,
    public canceled: boolean,
    public type: LessonType,
    public status: Status,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

}
