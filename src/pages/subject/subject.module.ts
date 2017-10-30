import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SubjectPage } from './subject';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    SubjectPage
  ],
  imports: [
    IonicPageModule.forChild(SubjectPage),
    ComponentsModule,
    TranslateModule.forChild(),
  ],
})
export class SubjectPageModule {}
