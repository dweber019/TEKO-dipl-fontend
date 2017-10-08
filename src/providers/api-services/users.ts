import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { User } from './../../models/User';
import { ChatProvider, Chat } from './chats';
import { GroupProvider, Group } from './groups';
import { GradeProvider, Grade } from './grades';

export {
  User,
  Group,
  Chat,
  Grade,
};

export interface IUserCreate {
  firstname: string;
  lastname: string;
  type: string;
  inviteEmail: string;
}

export interface IChatCreate {
  senderId: number;
  receiverId: number;
  message: string;
}

@Injectable()
export class UserProvider {

  public static RESOURCE = 'users';

  constructor(
    private api: Api
  ) { }

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

  public getGroups(id: number): Observable<Group[]> {
    return this.api.get<Group[]>(UserProvider.RESOURCE + '/' + id + '/' + GroupProvider.RESOURCE)
      .map(data => data.map(item => GroupProvider.toModel(item)));
  }

  public getChats(id: number): Observable<Chat[]> {
    return this.api.get<Chat[]>(UserProvider.RESOURCE + '/' + id + '/' + ChatProvider.RESOURCE)
      .map(data => data.map(item => ChatProvider.toModel(item)));
  }

  public createChat(chat: IChatCreate): Observable<Chat> {
    return this.api.post<Chat>(UserProvider.RESOURCE + '/' + chat.senderId + '/' + ChatProvider.RESOURCE, chat)
      .map(data => ChatProvider.toModel(data));
  }

  public destoryChat(id: number, id2: number): Observable<void> {
    return this.api.delete<void>(UserProvider.RESOURCE + '/' + id + '/' + ChatProvider.RESOURCE + '/' + id2);
  }

  public chatsRead(user1: number, user2: number): Observable<void> {
    return this.api.post<void>(UserProvider.RESOURCE + '/' + user1 + '/' + ChatProvider.RESOURCE + '/' + user2 + '/read', null);
  }

  public getGrades(id: number): Observable<Grade[]> {
    return this.api.get<Grade[]>(UserProvider.RESOURCE + '/' + id + '/' + GradeProvider.RESOURCE)
      .map(data => data.map(item => GradeProvider.toSubjectModel(item)));
  }

  public static toModel(json: User): User {
    return new User(
      json.id,
      json.firstname,
      json.lastname,
      json.type,
      json.calenderToken,
      json.picture,
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
