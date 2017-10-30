import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { LessonDetailPage } from './lesson-detail';
import { LessonTaskCompnent } from './../../components/lesson-task/lesson-task';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    LessonDetailPage,
    LessonTaskCompnent,
  ],
  imports: [
    IonicPageModule.forChild(LessonDetailPage),
    ComponentsModule,
    TranslateModule.forChild(),
  ],
})
export class LessonDetailPageModule {}
