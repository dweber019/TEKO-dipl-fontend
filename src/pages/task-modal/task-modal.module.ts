import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { TaskModalPage } from './task-modal';

@NgModule({
  declarations: [
    TaskModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskModalPage),
    TranslateModule.forChild(),
  ],
})
export class TaskModalPageModule {}
