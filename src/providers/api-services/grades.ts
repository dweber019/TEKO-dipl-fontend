import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { Grade } from './../../models/grade';
import { GradeUser } from './../../models/gradeuser';
import { UserProvider, User } from './users';

export {
  User,
  Grade,
  GradeUser,
};

@Injectable()
export class GradeProvider {

  public static RESOURCE = 'grades';

  constructor(
    // private api: Api
  ) { }

  public static toSubjectModel(json: Grade): Grade {
    return new Grade(
      json.id,
      json.name,
      !!json.archived,
      json.teacher && UserProvider.toModel(json.teacher),
      json.grade,
      json.gradeDate && moment(json.gradeDate),
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

  public static toUserModel(json: GradeUser): GradeUser {
    return new GradeUser(
      json.id,
      json.firstname,
      json.lastname,
      json.type,
      json.calenderToken,
      json.picture,
      json.grade,
      json.gradeDate && moment(json.gradeDate),
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
