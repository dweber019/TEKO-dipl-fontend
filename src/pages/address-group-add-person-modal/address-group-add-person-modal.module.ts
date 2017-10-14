import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { AddressGroupAddPersonModalPage } from './address-group-add-person-modal';

@NgModule({
  declarations: [
    AddressGroupAddPersonModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressGroupAddPersonModalPage),
    TranslateModule.forChild(),
  ],
})
export class AddressGroupAddPersonModalPageModule {}
