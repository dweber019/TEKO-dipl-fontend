import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SubjectAddGradeModalPage } from './subject-add-grade-modal';

@NgModule({
  declarations: [
    SubjectAddGradeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SubjectAddGradeModalPage),
    TranslateModule.forChild(),
  ],
})
export class SubjectAddGradeModalPageModule {}
