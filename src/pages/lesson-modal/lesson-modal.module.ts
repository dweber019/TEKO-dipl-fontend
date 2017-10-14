import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { LessonModalPage } from './lesson-modal';

@NgModule({
  declarations: [
    LessonModalPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonModalPage),
    TranslateModule.forChild(),
  ],
})
export class LessonModalPageModule {}
