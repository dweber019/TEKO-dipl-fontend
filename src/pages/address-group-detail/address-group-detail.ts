import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ModalController,
} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { AddressPage, AddressPersonDetailPage } from '../../pages/pages';
import { GroupProvider, Group, User } from './../../providers/api-services/groups';
import { AddressGroupModalPage } from './../address-group-modal/address-group-modal';
import { AddressGroupAddPersonModalPage } from './../address-group-add-person-modal/address-group-add-person-modal';
import { UserInfoProvider } from './../../providers/user-info';

@IonicPage()
@Component({
  selector: 'page-address-group-detail',
  templateUrl: 'address-group-detail.html',
})
export class AddressGroupDetailPage {

  private translation;

  public group: Group;
  public users: User[];
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private groupProvider: GroupProvider,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private userInfoProvider: UserInfoProvider,
    private translateService: TranslateService,
  ) {
    this.group = this.navParams.data;

    this.translateService.get([
      'CANCEL',
      'NEW_PERSON',
      'EDIT_GROUP',
      'DELETE_GROUP',
    ]).subscribe(translation => this.translation = translation);
  }

  public ionViewDidEnter(): void {
    if (!this.group.id) {
      this.backToGroups();
    } else {
      this.loadUser();
    }
  }

  public get isAdmin(): boolean {
    return this.userInfoProvider.isAdmin();
  }

  public removeUser($event: Event, user: User): void {
    $event.stopPropagation();
    this.groupProvider.removeUser(this.group.id, user.id)
      .subscribe(() => this.loadUser());
  }

  public goToUser(user: User): void {
    this.navCtrl.push(AddressPersonDetailPage, user);
  }

  public openActions(): void {
    let actionSheet = this.actionSheetController.create({
      buttons: [
        {
          text: this.translation.EDIT_GROUP,
          handler: () => {
            this.presentGroupModal();
          }
        },
        {
          text: this.translation.NEW_PERSON,
          handler: () => {
            this.presentGroupAddPersonModal();
          }
        },
        {
          text: this.translation.DELETE_GROUP,
          role: 'destructive',
          handler: () => {
            this.groupProvider.destory(this.group.id)
              .subscribe(() => this.backToGroups());
          }
        },
        {
          text: this.translation.CANCEL,
          role: 'cancel',
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

  private backToGroups(): void {
    this.navCtrl.push(AddressPage, { segment: 'group' });
  }

  private presentGroupModal(): void {
    let modal = this.modalController.create(AddressGroupModalPage, this.group);
    modal.onDidDismiss(() => this.reloadGroup());
    modal.present();
  }

  private presentGroupAddPersonModal(): void {
    let modal = this.modalController.create(AddressGroupAddPersonModalPage, this.group);
    modal.onDidDismiss(() => this.loadUser());
    modal.present();
  }

  private reloadGroup(): void {
    this.groupProvider.get(this.group.id)
      .subscribe(group => this.group = group);
  }

}
