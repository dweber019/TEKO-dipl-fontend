import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddressPersonDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-person-detail',
  templateUrl: 'address-person-detail.html',
})
export class AddressPersonDetailPage {

  public paramData: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.paramData = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPersonDetailPage');
  }

}
