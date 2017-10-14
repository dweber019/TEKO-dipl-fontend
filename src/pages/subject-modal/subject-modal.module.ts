import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SubjectModalPage } from './subject-modal';

@NgModule({
  declarations: [
    SubjectModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SubjectModalPage),
    TranslateModule.forChild(),
  ],
})
export class SubjectModalPageModule {}
