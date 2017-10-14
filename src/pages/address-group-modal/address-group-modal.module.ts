import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { AddressGroupModalPage } from './address-group-modal';

@NgModule({
  declarations: [
    AddressGroupModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressGroupModalPage),
    TranslateModule.forChild(),
  ],
})
export class AddressGroupnModalPageModule {}
