import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { NotificationPage } from './notification';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    NotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    ComponentsModule,
    TranslateModule.forChild(),
  ],
})
export class NotificationPageModule {}
