import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { ChatDetailPage } from './../pages';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  constructor(
    public navCtrl: NavController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  public goToChat(): void {
    this.navCtrl.push(ChatDetailPage, 'Data from ChatPage');
  }

}
