import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubjectLessonPage } from './subject-lesson';

@NgModule({
  declarations: [
    SubjectLessonPage,
  ],
  imports: [
    IonicPageModule.forChild(SubjectLessonPage),
  ],
})
export class SubjectLessonPageModule {}
