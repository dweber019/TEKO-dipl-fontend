import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddressPersonDetailPage } from './../pages';

/**
 * Generated class for the AddressPersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-person',
  templateUrl: 'address-person.html',
})
export class AddressPersonPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPersonPage');
  }

  public goToDetail(): void {
    this.navParams.data.push(AddressPersonDetailPage, 'Data from AddressPersonPage');
  }

}
