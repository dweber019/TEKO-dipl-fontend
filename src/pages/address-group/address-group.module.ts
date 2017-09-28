import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressGroupPage } from './address-group';

@NgModule({
  declarations: [
    AddressGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressGroupPage),
  ],
})
export class AddressGroupPageModule {}
