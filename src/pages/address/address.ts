import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  public tab: string = 'person';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    if (this.navParams.data.segment) {
      this.tab = this.navParams.data.segment;
    }
  }

}
