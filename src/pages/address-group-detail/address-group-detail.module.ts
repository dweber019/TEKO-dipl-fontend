import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { AddressGroupDetailPage } from './address-group-detail';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    AddressGroupDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressGroupDetailPage),
    ComponentsModule,
    TranslateModule.forChild(),
  ],
})
export class AddressGroupDetailPageModule {}
