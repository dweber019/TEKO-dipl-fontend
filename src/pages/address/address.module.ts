import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressPage } from './address';
import { AddressGroupComonent } from './../address-group/address-group';
import { AddressPersonComponent } from './../address-person/address-person';

@NgModule({
  declarations: [
    AddressPage,
    AddressGroupComonent,
    AddressPersonComponent
  ],
  imports: [
    IonicPageModule.forChild(AddressPage),
  ],
})
export class AddressPageModule {}
