import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'component-notification-unread',
  templateUrl: 'notification-unread.html',
})
export class NotificationUnreadComponent {

  constructor(
    public navCtrl: NavController
  ) {
  }

}
