import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';

import { LoaderComponent } from './loader/loader';
import { CommentComponent } from './comment/comment';
import { NoteComponent } from './note/note';

@NgModule({
	declarations: [
    LoaderComponent,
    CommentComponent,
    NoteComponent,
  ],
	imports: [
    CKEditorModule,
    FormsModule,
    CommonModule
  ],
	exports: [
    LoaderComponent,
    CommentComponent,
    NoteComponent,
  ]
})
export class ComponentsModule {}
