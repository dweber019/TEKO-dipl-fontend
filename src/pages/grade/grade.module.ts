import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { GradePage } from './grade';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    GradePage,
  ],
  imports: [
    IonicPageModule.forChild(GradePage),
    ComponentsModule,
    TranslateModule.forChild(),
  ],
})
export class GradePageModule {}
