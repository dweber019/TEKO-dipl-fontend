import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskResultPage } from './task-result';

@NgModule({
  declarations: [
    TaskResultPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskResultPage),
  ],
})
export class TaskResultPageModule {}
