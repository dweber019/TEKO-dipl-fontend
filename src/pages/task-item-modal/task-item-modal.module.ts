import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { TaskItemModalPage } from './task-item-modal';

@NgModule({
  declarations: [
    TaskItemModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskItemModalPage),
    TranslateModule.forChild(),
  ],
})
export class TaskItemModalPageModule {}
