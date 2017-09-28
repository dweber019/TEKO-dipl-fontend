import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressPersonPage } from './address-person';

@NgModule({
  declarations: [
    AddressPersonPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressPersonPage),
  ],
})
export class AddressPersonPageModule {}
