import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationPage } from './notification';

import { NotificationReadComponent } from './../../components/notification-read/notification-read';
import { NotificationUnreadComponent } from './../../components/notification-unread/notification-unread';

@NgModule({
  declarations: [
    NotificationPage,
    NotificationReadComponent,
    NotificationUnreadComponent
  ],
  imports: [
    IonicPageModule.forChild(NotificationPage),
  ],
})
export class NotificationPageModule {}
