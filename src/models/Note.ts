import * as moment from 'moment';

export class Note {

  constructor(
    public note: string,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) { }

}
