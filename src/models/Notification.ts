import * as moment from 'moment';

import { BaseModel } from './Base';
import { RefType } from './RefType';
import { ChatPage, DashboardPage, LessonDetailPage, SubjectDetailPage, TaskDetailPage } from './../pages/pages';

export class Notification extends BaseModel{

  constructor(
    public id: number,
    public message: string,
    public read: boolean,
    public refId: number,
    public ref: RefType,
    public createdAt: moment.Moment,
    public updatedAt: moment.Moment,
  ) {
    super(id, createdAt, updatedAt);
  }

  public getPageByRef(): string {
    switch (this.ref) {
      case RefType.CHAT:
        return ChatPage;
      case RefType.LESSON:
        return LessonDetailPage;
      case RefType.SUBJECT:
        return SubjectDetailPage;
      case RefType.TASK:
        return TaskDetailPage;
      default:
        return DashboardPage;
    }
  }

}
