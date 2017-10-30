import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Note } from './../../models/Note';

export {
  Note,
};

@Injectable()
export class NoteProvider {

  public static RESOURCE = 'note';

  public static toModel(json: Note): Note {
    return new Note(
      json.note,
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
