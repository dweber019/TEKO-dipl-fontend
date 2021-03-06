import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ActionSheetButton,
  ModalController,
} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { AddressPage, AddressGroupDetailPage } from '../../pages/pages';
import { UserProvider, User, Group } from './../../providers/api-services/users';
import { AddressPersonModalPage } from './../address-person-modal/address-person-modal';
import { UserInfoProvider } from './../../providers/user-info';

@IonicPage()
@Component({
  selector: 'page-address-person-detail',
  templateUrl: 'address-person-detail.html',
})
export class AddressPersonDetailPage {

  private translation;

  public user: User;
  public groups: Group[];
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private userProvider: UserProvider,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private userInfoProvider: UserInfoProvider,
    private translateService: TranslateService,
  ) {
    this.user = this.navParams.data;

    this.translateService.get([
      'CANCEL',
      'EDIT_PERSON',
      'DELETE_PERSON',
    ]).subscribe(translation => this.translation = translation);
  }

  public get isAdmin(): boolean {
    return this.userInfoProvider.isAdmin();
  }

  public get isOwnUser(): boolean {
    return this.userInfoProvider.getUser().id === this.user.id;
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
        ...this.getActionSheetbuttons(),
        {
          text: this.translation.CANCEL,
          role: 'cancel',
          handler: () => void 0
        }
      ]
    });
    actionSheet.present();
  }

  private getActionSheetbuttons(): ActionSheetButton[] {
    let buttons = [];

    if (this.isAdmin || this.isOwnUser) {
      buttons.push({
        text: this.translation.EDIT_PERSON,
        handler: () => {
          this.presentPersonModal();
        }
      });
    }

    if (this.isAdmin) {
      buttons.push({
        text: this.translation.DELETE_PERSON,
        role: 'destructive',
        handler: () => {
          this.userProvider.destory(this.user.id)
            .subscribe(() => this.backToPerson());
        }
      });
    }

    return buttons;
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
