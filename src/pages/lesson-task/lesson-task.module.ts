import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonTaskPage } from './lesson-task';

@NgModule({
  declarations: [
    LessonTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonTaskPage),
  ],
})
export class LessonTaskPageModule {}
