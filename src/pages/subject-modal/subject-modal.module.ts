import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubjectModalPage } from './subject-modal';

@NgModule({
  declarations: [
    SubjectModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SubjectModalPage),
  ],
})
export class SubjectModalPageModule {}
