import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddressPage, AddressGroupDetailPage } from '../../pages/pages';
import { UserProvider, User, Group } from './../../providers/api-services/users';

@IonicPage()
@Component({
  selector: 'page-address-person-detail',
  templateUrl: 'address-person-detail.html',
})
export class AddressPersonDetailPage {

  public user: User;
  public groups: Group[];
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private userProvider: UserProvider,
  ) {
    this.user = navParams.data;
  }

  public ionViewDidLoad(): void {
    if (!this.user.id) {
      this.navCtrl.setRoot(AddressPage);
    } else {
      this.groups = [];
      this.loading = true;
      this.userProvider.getGroups(this.user.id)
        .subscribe(data => {
          this.loading = false;
          this.groups = data;
        });
    }
  }

  public goToGroup(group: Group): void {
    this.navCtrl.push(AddressGroupDetailPage, group);
  }

}
