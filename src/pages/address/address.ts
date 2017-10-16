import { Component } from '@angular/core';
import {
  IonicPage,
  NavParams,
  ActionSheetController,
  ActionSheetButton,
  ModalController
} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { NgRadio } from 'ng-radio';

import { AddressPersonModalPage } from './../address-person-modal/address-person-modal';
import { AddressGroupModalPage } from './../address-group-modal/address-group-modal';
import { UserInfoProvider } from './../../providers/user-info';

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  private translation;

  public tab: string = 'person';

  constructor(
    private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private userInfoProvider: UserInfoProvider,
    private translateService: TranslateService,
    private ngRadio: NgRadio,
  ) {
    if (this.navParams.data.segment) {
      this.tab = this.navParams.data.segment;
    }

    this.translateService.get([
      'CANCEL',
      'NEW_PERSON',
      'NEW_GROUP',
    ]).subscribe(translation => this.translation = translation);
  }

  public get canAddPerson(): boolean {
    return this.userInfoProvider.isAdmin();
  }

  public openActions(): void {
    let actionSheet = this.actionSheetController.create({
      buttons: [
        ...this.getActionSheetButtons(),
        {
          text: this.translation.CANCEL,
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
          text: this.translation.NEW_PERSON,
          handler: () => {
            this.presentPersonModal();
          }
        }
      ];
    }
    return [
      {
        text: this.translation.NEW_GROUP,
        handler: () => {
          this.presentGroupModal();
        }
      }
    ];
  }

  private presentPersonModal(): void {
    let modal = this.modalController.create(AddressPersonModalPage);
    modal.onDidDismiss(() => this.ngRadio.cast('person:add'));
    modal.present();
  }

  private presentGroupModal(): void {
    let modal = this.modalController.create(AddressGroupModalPage);
    modal.onDidDismiss(() => this.ngRadio.cast('group:add'));
    modal.present();
  }

}
