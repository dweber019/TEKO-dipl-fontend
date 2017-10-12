import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskItemModalPage } from './task-item-modal';

@NgModule({
  declarations: [
    TaskItemModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskItemModalPage),
  ],
})
export class TaskItemModalPageModule {}
