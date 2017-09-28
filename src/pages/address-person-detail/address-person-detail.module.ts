import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressPersonDetailPage } from './address-person-detail';

@NgModule({
  declarations: [
    AddressPersonDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressPersonDetailPage),
  ],
})
export class AddressPersonDetailPageModule {}
