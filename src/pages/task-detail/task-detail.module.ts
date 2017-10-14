import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { TaskDetailPage } from './task-detail';
import { TaskResultComponent } from './../../components/task-result/task-result';
import { TaskItemCompnent } from './../../components/task-item/task-item';
import { ComponentsModule } from './../../components/components.module';
import { DirectivesModule } from './../../directives/directives.module';

@NgModule({
  declarations: [
    TaskDetailPage,
    TaskItemCompnent,
    TaskResultComponent
  ],
  imports: [
    IonicPageModule.forChild(TaskDetailPage),
    TranslateModule.forChild(),
    ComponentsModule,
    DirectivesModule,
  ],
})
export class TaskDetailPageModule {}
