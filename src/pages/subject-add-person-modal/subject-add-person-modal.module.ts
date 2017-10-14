import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubjectAddPersonModalPage } from './subject-add-person-modal';

@NgModule({
  declarations: [
    SubjectAddPersonModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SubjectAddPersonModalPage),
  ],
})
export class SubjectAddPersonModalPageModule {}
