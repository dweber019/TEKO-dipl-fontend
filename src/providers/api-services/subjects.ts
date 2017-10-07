import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { Subject } from './../../models/Subject';
import { UserProvider, User } from './../../providers/api-services/users';
import { GradeProvider, GradeUser } from './grades';

export {
  Subject,
  User,
  GradeUser,
};

@Injectable()
export class SubjectProvider {

  public static RESOURCE = 'subjects';

  constructor(
    private api: Api
  ) { }

  public getAll(): Observable<Subject[]> {
    return this.api.get<Subject[]>(SubjectProvider.RESOURCE)
      .map(data => data.map(item => SubjectProvider.toModel(item)));
  }

  public get(id: number): Observable<Subject> {
    return this.api.get<Subject>(SubjectProvider.RESOURCE + '/' + id)
      .map(data => SubjectProvider.toModel(data));
  }

  public create(subject: Subject): Observable<Subject> {
    return this.api.post<Subject>(SubjectProvider.RESOURCE, subject)
      .map(data => SubjectProvider.toModel(data));
  }

  public update(subject: Subject): Observable<Subject> {
    return this.api.put<Subject>(SubjectProvider.RESOURCE + '/' + subject.id, subject)
      .map(data => SubjectProvider.toModel(data));
  }

  public destory(id: number): Observable<void> {
    return this.api.delete<void>(SubjectProvider.RESOURCE + '/' + id);
  }

  public getUsers(id: number): Observable<User[]> {
    return this.api.get<User[]>(SubjectProvider.RESOURCE + '/' + id + '/' + UserProvider.RESOURCE)
      .map(data => data.map(item => UserProvider.toModel(item)));
  }

  public getGrades(id: number): Observable<GradeUser[]> {
    return this.api.get<GradeUser[]>(SubjectProvider.RESOURCE + '/' + id + '/' + GradeProvider.RESOURCE)
      .map(data => data.map(item => GradeProvider.toUserModel(item)));
  }

  public static toModel(json: Subject): Subject {
    return new Subject(
      json.id,
      json.name,
      !!json.archived,
      json.status,
      json.teacher && UserProvider.toModel(json.teacher),
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
