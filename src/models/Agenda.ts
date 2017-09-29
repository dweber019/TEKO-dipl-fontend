import * as moment from 'moment';

import { BaseModel } from './Base';

export class Agenda extends BaseModel{

  constructor(
    public id: number,
    public name: string,
    public startDate: moment.Moment,
    public endDate: moment.Moment,
    public location: string,
    public room: string,
    public canceled: boolean,
    public type: string,
    public subjectId: number,
    public status: boolean,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

}
