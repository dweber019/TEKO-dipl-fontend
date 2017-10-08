import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { Task } from './../../models/task';
import { NoteProvider, Note } from './notes';
import { CommentProvider, Comment } from './comments';

export {
  Task,
};

@Injectable()
export class TaskProvider {

  public static RESOURCE = 'tasks';

  constructor(
    private api: Api
  ) { }

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
