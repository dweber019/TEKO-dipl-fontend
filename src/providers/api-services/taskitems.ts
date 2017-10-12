import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { TaskItem } from './../../models/TaskItem';

export {
  TaskItem
};

export interface ITaskItemPost {
  title: string;
  description: string;
  questionType: string;
  question: string;
}

@Injectable()
export class TaskItemProvider {

  public static RESOURCE = 'taskItems';

  constructor(
    private api: Api
  ) { }

  public update(id: number, taskItem: ITaskItemPost): Observable<TaskItem> {
    return this.api.put<TaskItem>(TaskItemProvider.RESOURCE + '/' + id, taskItem)
      .map(data => TaskItemProvider.toModel(data));
  }

  public destory(id: number): Observable<void> {
    return this.api.delete<void>(TaskItemProvider.RESOURCE + '/' + id);
  }

  public static toModel(json: TaskItem): TaskItem {
    return new TaskItem(
      json.id,
      json.title,
      json.description,
      json.questionType,
      json.question,
      json.order,
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
