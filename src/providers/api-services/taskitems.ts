import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { TaskItem } from './../../models/TaskItem';
import { QuestionType } from './../../models/QuestionType';
import { UserProvider } from './users';

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

  public work(id: number, result: any): Observable<TaskItem> {
    return this.api.put<TaskItem>(TaskItemProvider.RESOURCE + '/' + id + '/work', { result }, { responseType: 'text' });
  }

  public uploadFile(id: number, formData): Observable<void> {
    return this.api.post<void>(TaskItemProvider.RESOURCE + '/' + id + '/file', formData, { responseType: 'text' });
  }

  public static toModel(json: TaskItem): TaskItem {
    return new TaskItem(
      json.id,
      json.title,
      json.description,
      json.questionType,
      json.question,
      json.order,
      json.users && json.users.map(item => ({
        result: json.questionType === QuestionType.TOGGLE ? !!item.result : item.result,
        user: UserProvider.toModel(item.user),
        fileUrl: item.fileUrl,
      })),
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
