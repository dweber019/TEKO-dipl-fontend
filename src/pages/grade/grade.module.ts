import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { GradePage } from './grade';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    GradePage,
  ],
  imports: [
    IonicPageModule.forChild(GradePage),
    ComponentsModule,
  ],
})
export class GradePageModule {}
