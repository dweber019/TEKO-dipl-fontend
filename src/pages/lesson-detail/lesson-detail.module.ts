import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonDetailPage } from './lesson-detail';

import { LessonTaskCompnent } from './../../components/lesson-task/lesson-task';
import { NoteCommentModule } from './../../components/note-comment.module';

@NgModule({
  declarations: [
    LessonDetailPage,
    LessonTaskCompnent,
  ],
  imports: [
    IonicPageModule.forChild(LessonDetailPage),
    NoteCommentModule
  ],
})
export class LessonDetailPageModule {}
