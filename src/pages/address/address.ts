import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddressPersonPage, AddressGroupPage } from './../pages';

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  public addressPersonTab: string;
  public addressGroupTab: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.addressPersonTab = AddressPersonPage;
    this.addressGroupTab = AddressGroupPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }

}
