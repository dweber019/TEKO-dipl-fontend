import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController
} from 'ionic-angular';

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
    private actionSheetController: ActionSheetController,
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

  public openActions(): void {
    let actionSheet = this.actionSheetController.create({
      buttons: [
        {
          text: 'Delete group',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            //this.presentModal();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => void 0
        }
      ]
    });
    actionSheet.present();
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
