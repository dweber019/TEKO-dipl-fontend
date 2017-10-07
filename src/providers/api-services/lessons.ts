import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { Lesson } from './../../models/Lesson';

export {
  Lesson
};

@Injectable()
export class LessonProvider {

  public static RESOURCE = 'lessons';

  constructor(
    private api: Api
  ) { }

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
