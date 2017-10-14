import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonModalPage } from './lesson-modal';

@NgModule({
  declarations: [
    LessonModalPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonModalPage),
  ],
})
export class LessonModalPageModule {}
