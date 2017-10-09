import * as moment from 'moment';

import { Status } from './Status';

export class BaseModel {
  constructor(
    public id: number,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) { }

  public getStatusColor(): string {
    if (this['status']) {
      switch (this['status']) {
        case Status.DONE:
          return 'secondary';
        case Status.NOTASK:
          return 'primary';
        case Status.OPEN:
          return 'danger';
      }
    }
    return;
  }
}
