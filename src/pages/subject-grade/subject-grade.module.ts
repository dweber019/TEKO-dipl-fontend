import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubjectGradePage } from './subject-grade';

@NgModule({
  declarations: [
    SubjectGradePage,
  ],
  imports: [
    IonicPageModule.forChild(SubjectGradePage),
  ],
})
export class SubjectGradePageModule {}
