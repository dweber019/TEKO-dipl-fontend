import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { AddressPersonModalPage } from './address-person-modal';

@NgModule({
  declarations: [
    AddressPersonModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressPersonModalPage),
    TranslateModule.forChild(),
  ],
})
export class AddressPersonModalPageModule {}
