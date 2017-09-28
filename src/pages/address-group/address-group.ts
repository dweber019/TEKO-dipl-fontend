import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddressGroupDetailPage } from './../pages';

/**
 * Generated class for the AddressGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-group',
  templateUrl: 'address-group.html',
})
export class AddressGroupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressGroupPage');
  }

  public goToDetail(): void {
    this.navParams.data.push(AddressGroupDetailPage, 'Data from AddressGroupPage');
  }

}
