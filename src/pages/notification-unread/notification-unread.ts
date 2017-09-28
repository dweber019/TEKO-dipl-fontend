import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotificationUnreadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification-unread',
  templateUrl: 'notification-unread.html',
})
export class NotificationUnreadPage {

  public tabParam: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.tabParam = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationUnreadPage');
  }

}
