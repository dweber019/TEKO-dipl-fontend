import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressGroupDetailPage } from './address-group-detail';

@NgModule({
  declarations: [
    AddressGroupDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressGroupDetailPage),
  ],
})
export class AddressGroupDetailPageModule {}
