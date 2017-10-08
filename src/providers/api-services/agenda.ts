import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { Agenda } from './../../models/Agenda';

export {
  Agenda
};

@Injectable()
export class AgendaProvider {

  public static RESOURCE = 'agenda';

  constructor(
    private api: Api
  ) { }

  public getAgenda(): Observable<Agenda[]> {
    return this.api.get<Agenda[]>(AgendaProvider.RESOURCE)
      .map(data => data.map(item => AgendaProvider.toModel(item)));
  }

  public static toModel(json: Agenda): Agenda {
    return new Agenda(
      json.id,
      json.name,
      json.startDate && moment(json.startDate),
      json.endDate && moment(json.endDate),
      json.location,
      json.room,
      !!json.canceled,
      json.type,
      json.subjectId,
      json.status,
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
