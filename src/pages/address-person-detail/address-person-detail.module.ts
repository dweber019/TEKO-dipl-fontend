import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { AddressPersonDetailPage } from './address-person-detail';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    AddressPersonDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressPersonDetailPage),
    ComponentsModule,
    TranslateModule.forChild(),
  ],
})
export class AddressPersonDetailPageModule {}
