import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskDetailPage } from './task-detail';

import { TaskResultComponent } from './../../components/task-result/task-result';
import { TaskItemCompnent } from './../../components/task-item/task-item';
import { NoteCommentModule } from './../../components/note-comment.module';

@NgModule({
  declarations: [
    TaskDetailPage,
    TaskItemCompnent,
    TaskResultComponent
  ],
  imports: [
    IonicPageModule.forChild(TaskDetailPage),
    NoteCommentModule
  ],
})
export class TaskDetailPageModule {}
