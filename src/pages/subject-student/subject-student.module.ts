import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubjectStudentPage } from './subject-student';

@NgModule({
  declarations: [
    SubjectStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(SubjectStudentPage),
  ],
})
export class SubjectStudentPageModule {}
