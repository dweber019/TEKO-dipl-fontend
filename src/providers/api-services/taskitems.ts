import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { TaskItem } from './../../models/TaskItem';

export {
  TaskItem
};

@Injectable()
export class TaskItemProvider {

  public static RESOURCE = 'taskitems';

  constructor(
    // private api: Api
  ) { }

  public static toModel(json: TaskItem): TaskItem {
    return new TaskItem(
      json.id,
      json.title,
      json.description,
      json.questionType,
      json.question,
      json.order,
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
