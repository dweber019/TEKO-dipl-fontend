import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SubjectAddPersonModalPage } from './subject-add-person-modal';

@NgModule({
  declarations: [
    SubjectAddPersonModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SubjectAddPersonModalPage),
    TranslateModule.forChild(),
  ],
})
export class SubjectAddPersonModalPageModule {}
