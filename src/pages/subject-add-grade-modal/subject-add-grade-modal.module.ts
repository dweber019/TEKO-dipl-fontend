import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubjectAddGradeModalPage } from './subject-add-grade-modal';

@NgModule({
  declarations: [
    SubjectAddGradeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SubjectAddGradeModalPage),
  ],
})
export class SubjectAddGradeModalPageModule {}
