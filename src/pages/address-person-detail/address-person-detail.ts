import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ModalController,
} from 'ionic-angular';

import { AddressPage, AddressGroupDetailPage } from '../../pages/pages';
import { UserProvider, User, Group } from './../../providers/api-services/users';
import { AddressPersonModalPage } from './../address-person-modal/address-person-modal';

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
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
  ) {
    this.user = navParams.data;
  }

  public ionViewDidLoad(): void {
    if (!this.user.id) {
      this.backToPerson();
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

  public openActions(): void {
    let actionSheet = this.actionSheetController.create({
      buttons: [
        {
          text: 'Edit person',
          handler: () => {
            this.presentPersonModal();
          }
        },
        {
          text: 'Delete person',
          role: 'destructive',
          handler: () => {
            this.userProvider.destory(this.user.id)
              .subscribe(() => this.backToPerson());
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => void 0
        }
      ]
    });
    actionSheet.present();
  }

  private backToPerson(): void {
    this.navCtrl.setRoot(AddressPage);
  }

  private presentPersonModal(): void {
    let modal = this.modalController.create(AddressPersonModalPage, this.user);
    modal.onDidDismiss(() => this.reloadUser());
    modal.present();
  }

  private reloadUser(): void {
    this.userProvider.get(this.user.id)
      .subscribe(user => this.user = user);
  }

}
