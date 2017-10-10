import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { Group } from './../../models/Group';
import { UserProvider, User } from './users';

export {
  Group,
  User,
};

@Injectable()
export class GroupProvider {

  public static RESOURCE = 'groups';

  constructor(
    private api: Api
  ) { }

  public getAll(): Observable<Group[]> {
    return this.api.get<Group[]>(GroupProvider.RESOURCE)
      .map(data => data.map(item => GroupProvider.toModel(item)));
  }

  public get(id: number): Observable<Group> {
    return this.api.get<Group>(GroupProvider.RESOURCE + '/' + id)
      .map(data => GroupProvider.toModel(data));
  }

  public create(group: { name: string }): Observable<Group> {
    return this.api.post<Group>(GroupProvider.RESOURCE, group)
      .map(data => GroupProvider.toModel(data));
  }

  public update(group: Group): Observable<Group> {
    return this.api.put<Group>(GroupProvider.RESOURCE + '/' + group.id, group)
      .map(data => GroupProvider.toModel(data));
  }

  public destory(id: number): Observable<void> {
    return this.api.delete<void>(GroupProvider.RESOURCE + '/' + id);
  }

  public getUsers(id: number): Observable<User[]> {
    return this.api.get<User[]>(GroupProvider.RESOURCE + '/' + id + '/' + UserProvider.RESOURCE)
      .map(data => data.map(item => UserProvider.toModel(item)));
  }

  public addUser(groupId: number, userId: number): Observable<void> {
    return this.api.post<void>(GroupProvider.RESOURCE + '/' + groupId + '/' + UserProvider.RESOURCE + '/' + userId, null);
  }

  public removeUser(groupId: number, userId: number): Observable<void> {
    return this.api.delete<void>(GroupProvider.RESOURCE + '/' + groupId + '/' + UserProvider.RESOURCE + '/' + userId);
  }

  public static toModel(json: Group): Group {
    return new Group(
      json.id,
      json.name,
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
