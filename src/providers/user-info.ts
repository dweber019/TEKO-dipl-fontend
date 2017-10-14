import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { UserProvider, User } from './api-services/users';
import { UserType } from './../models/UserType';

export {
  User
};

@Injectable()
export class UserInfoProvider {

  public user: User;

  constructor(
    private userProvider: UserProvider,
  ) {

  }

  public getUser(): User {
    return this.user;
  }

  public loadUser(): Observable<User> {
    return this.userProvider.getMe().map(user => this.user = user);
  }

  public isAdmin(): boolean {
    return this.user && this.user.type === UserType.ADMIN;
  }

  public isTeacher(): boolean {
    return this.user && this.user.type === UserType.TEACHER;
  }

  public isStudent(): boolean {
    return this.user && this.user.type === UserType.STUDENT;
  }

}
