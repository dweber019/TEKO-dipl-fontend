import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ActionSheetButton,
  ModalController
} from 'ionic-angular';

import { AddressPersonModalPage } from './../address-person-modal/address-person-modal';
import { AddressGroupModalPage } from './../address-group-modal/address-group-modal';
import { UserInfoProvider } from './../../providers/user-info';

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  public tab: string = 'person';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private userInfoProvider: UserInfoProvider,
  ) {
    if (this.navParams.data.segment) {
      this.tab = this.navParams.data.segment;
    }
  }

  public get canAddPerson(): boolean {
    return this.userInfoProvider.isAdmin();
  }

  public openActions(): void {
    let actionSheet = this.actionSheetController.create({
      buttons: [
        ...this.getActionSheetButtons(),
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => void 0
        }
      ]
    });
    actionSheet.present();
  }

  private getActionSheetButtons(): ActionSheetButton[] {
    if (this.tab === 'person') {
      return [
        {
          text: 'New person',
          handler: () => {
            this.presentPersonModal();
          }
        }
      ];
    }
    return [
      {
        text: 'New group',
        handler: () => {
          this.presentGroupModal();
        }
      }
    ];
  }

  private presentPersonModal(): void {
    let modal = this.modalController.create(AddressPersonModalPage);
    modal.present();
  }

  private presentGroupModal(): void {
    let modal = this.modalController.create(AddressGroupModalPage);
    modal.present();
  }

}
