import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { Lesson } from './../../models/Lesson';
import { NoteProvider, Note } from './notes';
import { CommentProvider, Comment } from './comments';

export {
  Lesson,
  Note,
  Comment,
};

@Injectable()
export class LessonProvider {

  public static RESOURCE = 'lessons';

  constructor(
    private api: Api
  ) { }

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
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
