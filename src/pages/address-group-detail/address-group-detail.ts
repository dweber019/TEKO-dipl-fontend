import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddressPage, AddressPersonDetailPage } from '../../pages/pages';
import { GroupProvider, Group, User } from './../../providers/api-services/groups';

@IonicPage()
@Component({
  selector: 'page-address-group-detail',
  templateUrl: 'address-group-detail.html',
})
export class AddressGroupDetailPage {

  public group: Group;
  public users: User[];
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private groupProvider: GroupProvider,
  ) {
    this.group = navParams.data;
  }

  public ionViewDidEnter(): void {
    if (!this.group.id) {
      this.navCtrl.push(AddressPage, { segment: 'group' });
    } else {
      this.loadUser();
    }
  }

  public goToUser(user: User): void {
    this.navCtrl.push(AddressPersonDetailPage, user);
  }

  public removeUser($event: Event, user: User): void {
    $event.stopPropagation();
    this.groupProvider.removeUser(this.group.id, user.id)
      .subscribe(() => this.loadUser());
  }

  private loadUser(): void {
    this.users = [];
    this.loading = true;
    this.groupProvider.getUsers(this.group.id)
      .subscribe(data => {
        this.loading = false;
        this.users = data;
      });
  }

}
