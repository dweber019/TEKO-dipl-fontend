import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { Task } from './../../models/task';
import { NoteProvider, Note } from './notes';
import { CommentProvider, Comment } from './comments';
import { TaskItemProvider, TaskItem, ITaskItemPost } from './taskitems';

export {
  Task,
  Note,
  Comment,
  TaskItem,
};

export interface ITaskPost {
  name: string;
  description: string;
  dueDate: string;
}

@Injectable()
export class TaskProvider {

  public static RESOURCE = 'tasks';

  constructor(
    private api: Api
  ) { }

  public get(id: number): Observable<Task> {
    return this.api.get<Task>(TaskProvider.RESOURCE + '/' + id)
      .map(data => TaskProvider.toModel(data));
  }

  public update(id: number, task: ITaskPost): Observable<Task> {
    return this.api.put<Task>(TaskProvider.RESOURCE + '/' + id, task)
      .map(data => TaskProvider.toModel(data));
  }

  public destory(id: number): Observable<void> {
    return this.api.delete<void>(TaskProvider.RESOURCE + '/' + id);
  }

  public getNote(id: number): Observable<Note> {
    return this.api.get<Note>(TaskProvider.RESOURCE + '/' + id + '/' + NoteProvider.RESOURCE)
      .map(data => NoteProvider.toModel(data));
  }

  public updateNote(id: number, note: string): Observable<Note> {
    return this.api.put<Note>(TaskProvider.RESOURCE + '/' + id + '/' + NoteProvider.RESOURCE, { note })
      .map(data => NoteProvider.toModel(data));
  }

  public getComments(id: number): Observable<Comment[]> {
    return this.api.get<Comment[]>(TaskProvider.RESOURCE + '/' + id + '/' + CommentProvider.RESOURCE)
      .map(data => data.map(item => CommentProvider.toModel(item)));
  }

  public createComment(id: number, message: string): Observable<Comment> {
    return this.api.post<Comment>(TaskProvider.RESOURCE + '/' + id + '/' + CommentProvider.RESOURCE, { message })
      .map(data => CommentProvider.toModel(data));
  }

  public getTaskItems(id: number): Observable<TaskItem[]> {
    return this.api.get<TaskItem[]>(TaskProvider.RESOURCE + '/' + id + '/' + TaskItemProvider.RESOURCE)
      .map(data => data.map(item => TaskItemProvider.toModel(item)));
  }

  public createTaskItem(id: number, taskItem: ITaskItemPost): Observable<TaskItem> {
    return this.api.post<TaskItem>(TaskProvider.RESOURCE + '/' + id + '/' + TaskItemProvider.RESOURCE, taskItem)
      .map(data => TaskItemProvider.toModel(data));
  }

  public static toModel(json: Task): Task {
    return new Task(
      json.id,
      json.name,
      json.description,
      json.dueDate && moment(json.dueDate),
      json.status,
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
