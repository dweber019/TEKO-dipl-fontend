import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Grade } from './../../models/grade';
import { GradeUser } from './../../models/gradeuser';
import { UserProvider } from './users';

export {
  Grade,
  GradeUser,
};

@Injectable()
export class GradeProvider {

  public static RESOURCE = 'grades';

  public static toSubjectModel(json: Grade): Grade {
    return new Grade(
      json.id,
      json.name,
      !!json.archived,
      json.teacher && UserProvider.toModel(json.teacher),
      json.teacherId,
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
      json.gradeId,
      json.grade,
      json.gradeDate && moment(json.gradeDate),
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
