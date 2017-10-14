import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressGroupAddPersonModalPage } from './address-group-add-person-modal';

@NgModule({
  declarations: [
    AddressGroupAddPersonModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressGroupAddPersonModalPage),
  ],
})
export class AddressGroupAddPersonModalPageModule {}
