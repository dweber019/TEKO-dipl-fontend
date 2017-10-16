import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { Api } from './../api/api';
import { Comment } from './../../models/Comment';

export {
  Comment,
};

@Injectable()
export class CommentProvider {

  public static RESOURCE = 'comments';

  constructor(
    private api: Api
  ) { }

  public update(id: number, message: string): Observable<Comment> {
    return this.api.put<Comment>(CommentProvider.RESOURCE + '/' + id, message)
      .map(data => CommentProvider.toModel(data));
  }

  public destory(id: number): Observable<void> {
    return this.api.delete<void>(CommentProvider.RESOURCE + '/' + id);
  }

  public static toModel(json: Comment): Comment {
    return new Comment(
      json.id,
      json.message,
      json.user,
      json.createdAt && moment(json.createdAt),
      json.updatedAt && moment(json.updatedAt),
    );
  }

}
