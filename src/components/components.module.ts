import { NgModule } from '@angular/core';

import { LoaderComponent } from './loader/loader';
import { CommentComponent } from './comment/comment';
import { NoteComponent } from './note/note';

@NgModule({
	declarations: [
    LoaderComponent,
    CommentComponent,
    NoteComponent,
  ],
	imports: [],
	exports: [
    LoaderComponent,
    CommentComponent,
    NoteComponent,
  ]
})
export class ComponentsModule {}
