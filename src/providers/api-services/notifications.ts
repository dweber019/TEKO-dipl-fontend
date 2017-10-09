import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { Notification } from './../../models/Notification';

export {
  Notification,
};

@Injectable()
export class NotificationProvider {

  public static RESOURCE = 'notifications';

  constructor(
    // private api: Api
  ) { }

  public static toModel(json: Notification): Notification {
    return new Notification(
      json.id,
      json.message,
      !!json.read,
      json.refId,
      json.ref,
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
