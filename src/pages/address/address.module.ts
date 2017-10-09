import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AddressPage } from './address';
import { AddressGroupComonent } from './../../components/address-group/address-group';
import { AddressPersonComponent } from './../../components/address-person/address-person';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    AddressPage,
    AddressGroupComonent,
    AddressPersonComponent
  ],
  imports: [
    IonicPageModule.forChild(AddressPage),
    ComponentsModule
  ],
})
export class AddressPageModule {}
