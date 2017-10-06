import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AddressGroupDetailPage } from './address-group-detail';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    AddressGroupDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressGroupDetailPage),
    ComponentsModule
  ],
})
export class AddressGroupDetailPageModule {}
