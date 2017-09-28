import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddressPersonDetailPage } from './../../pages/pages';

@Component({
  selector: 'component-address-person',
  templateUrl: 'address-person.html',
})
export class AddressPersonComponent {

  constructor(
    public navCtrl: NavController
  ) {
  }

  public goToDetail(): void {
    this.navCtrl.push(AddressPersonDetailPage, 'Data from AddressPersonPage');
  }

}
