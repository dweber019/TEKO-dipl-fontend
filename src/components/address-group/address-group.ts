import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddressGroupDetailPage } from './../../pages/pages';

@Component({
  selector: 'component-address-group',
  templateUrl: 'address-group.html',
})
export class AddressGroupComonent {

  constructor(
    public navCtrl: NavController
  ) { }

  public goToDetail(): void {
    this.navCtrl.push(AddressGroupDetailPage, 'Data from AddressGroupPage');
  }

}
