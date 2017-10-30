import * as moment from 'moment';

import { BaseModel } from './Base';
import { QuestionType } from './QuestionType';
import { User } from './User';

export class TaskItem extends BaseModel{

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public questionType: QuestionType,
    public question: string,
    public order: number,
    public users: {
      result: string | boolean,
      user: User,
      fileUrl: string,
    }[],
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

}
