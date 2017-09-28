import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NotificationReadPage, NotificationUnreadPage } from './../pages';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  public notificationReadTab: string;
  public notificationUnreadTab: string;

  public tabParam = 'Params from tabs root page';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.notificationReadTab = NotificationReadPage;
    this.notificationUnreadTab = NotificationUnreadPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

}
