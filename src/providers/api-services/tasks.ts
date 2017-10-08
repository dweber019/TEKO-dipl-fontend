import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { Task } from './../../models/task';

export {
  Task,
};

@Injectable()
export class TaskProvider {

  public static RESOURCE = 'tasks';

  constructor(
    // private api: Api
  ) { }

  public static toModel(json: Task): Task {
    return new Task(
      json.id,
      json.name,
      json.description,
      json.dueDate && moment(json.dueDate),
      json.status,
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
