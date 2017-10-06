import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AddressPersonDetailPage } from './address-person-detail';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    AddressPersonDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressPersonDetailPage),
    ComponentsModule,
  ],
})
export class AddressPersonDetailPageModule {}
