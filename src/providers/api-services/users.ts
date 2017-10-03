import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { User } from './../../models/User';

export {
  User
};

export interface IUserCreate {
  firstname: string;
  lastname: string;
  type: string;
  inviteEmail: string;
}

@Injectable()
export class UserProvider {

  public static RESOURCE = 'users';

  constructor(
    private api: Api
  ) {
    console.log('Hello UserProvider Provider');
  }

  public getAll(): Observable<User[]> {
    return this.api.get<User[]>(UserProvider.RESOURCE)
      .map(data => data.map(item => UserProvider.toModel(item)));
  }

  public get(id: number): Observable<User> {
    return this.api.get<User>(UserProvider.RESOURCE + '/' + id)
      .map(data => UserProvider.toModel(data));
  }

  public getMe(): Observable<User> {
    return this.api.get<User>(UserProvider.RESOURCE + '/me')
      .map(data => UserProvider.toModel(data));
  }

  public create(user: IUserCreate): Observable<User> {
    return this.api.post<User>(UserProvider.RESOURCE, user)
      .map(data => UserProvider.toModel(data));
  }

  public update(user: User): Observable<User> {
    return this.api.put<User>(UserProvider.RESOURCE + '/' + user.id, user)
      .map(data => UserProvider.toModel(data));
  }

  public destory(id: number): Observable<void> {
    return this.api.delete<void>(UserProvider.RESOURCE + '/' + id);
  }

  public static toModel(json: User): User {
    console.log(json);
    return new User(
      json.id,
      json.firstname,
      json.lastname,
      json.type,
      json.calenderToken,
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
