import * as moment from 'moment';

export class BaseModel {
  constructor(
    public id: number,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) { }
}
