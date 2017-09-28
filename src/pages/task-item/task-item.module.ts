import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskItemPage } from './task-item';

@NgModule({
  declarations: [
    TaskItemPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskItemPage),
  ],
})
export class TaskItemPageModule {}
