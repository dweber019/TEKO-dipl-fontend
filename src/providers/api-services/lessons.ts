import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { Lesson, LessonType } from './../../models/Lesson';
import { NoteProvider, Note } from './notes';
import { CommentProvider, Comment } from './comments';
import { TaskProvider, Task } from './tasks';

export {
  Lesson,
  Note,
  Comment,
  Task,
};

export interface ILessonPost {
  startDate: string;
  endDate: string;
  location: string;
  room: string;
  canceled: boolean;
  type: LessonType;
}

@Injectable()
export class LessonProvider {

  public static RESOURCE = 'lessons';

  constructor(
    private api: Api
  ) { }

  public get(id: number): Observable<Lesson> {
    return this.api.get<Lesson>(LessonProvider.RESOURCE + '/' + id)
      .map(data => LessonProvider.toModel(data));
  }

  public update(id: number, lesson: ILessonPost): Observable<Lesson> {
    return this.api.put<Lesson>(LessonProvider.RESOURCE + '/' + id, lesson)
      .map(data => LessonProvider.toModel(data));
  }

  public destory(id: number): Observable<void> {
    return this.api.delete<void>(LessonProvider.RESOURCE + '/' + id);
  }

  public getNote(id: number): Observable<Note> {
    return this.api.get<Note>(LessonProvider.RESOURCE + '/' + id + '/' + NoteProvider.RESOURCE)
      .map(data => NoteProvider.toModel(data));
  }

  public updateNote(id: number, note: string): Observable<Note> {
    return this.api.put<Note>(LessonProvider.RESOURCE + '/' + id + '/' + NoteProvider.RESOURCE, { note })
      .map(data => NoteProvider.toModel(data));
  }

  public getComments(id: number): Observable<Comment[]> {
    return this.api.get<Comment[]>(LessonProvider.RESOURCE + '/' + id + '/' + CommentProvider.RESOURCE)
      .map(data => data.map(item => CommentProvider.toModel(item)));
  }

  public createComment(id: number, message: string): Observable<Comment> {
    return this.api.post<Comment>(LessonProvider.RESOURCE + '/' + id + '/' + CommentProvider.RESOURCE, { message })
      .map(data => CommentProvider.toModel(data));
  }

  public getTasks(id: number): Observable<Task[]> {
    return this.api.get<Task[]>(LessonProvider.RESOURCE + '/' + id + '/' + TaskProvider.RESOURCE)
      .map(data => data.map(item => TaskProvider.toModel(item)));
  }

  public static toModel(json: Lesson): Lesson {
    return new Lesson(
      json.id,
      json.startDate && moment(json.startDate),
      json.endDate && moment(json.endDate),
      json.location,
      json.room,
      !!json.canceled,
      json.type,
      json.status,
      json.subjectId,
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
