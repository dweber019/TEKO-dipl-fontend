import { NgModule } from '@angular/core';

import { CommentComponent } from './comment/comment';
import { NoteComponent } from './note/note';

@NgModule({
  declarations: [
    NoteComponent,
    CommentComponent
  ],
  exports: [
    NoteComponent,
    CommentComponent
  ]
})
export class NoteCommentModule {}
