import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddressGroupDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-group-detail',
  templateUrl: 'address-group-detail.html',
})
export class AddressGroupDetailPage {

  public paramData: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.paramData = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressGroupDetailPage');
  }

}
