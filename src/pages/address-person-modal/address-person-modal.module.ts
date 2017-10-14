import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressPersonModalPage } from './address-person-modal';

@NgModule({
  declarations: [
    AddressPersonModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressPersonModalPage),
  ],
})
export class AddressPersonModalPageModule {}
