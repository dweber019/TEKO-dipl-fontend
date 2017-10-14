import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ModalController,
} from 'ionic-angular';

import { AddressPage, AddressPersonDetailPage } from '../../pages/pages';
import { GroupProvider, Group, User } from './../../providers/api-services/groups';
import { AddressGroupModalPage } from './../address-group-modal/address-group-modal';
import { AddressGroupAddPersonModalPage } from './../address-group-add-person-modal/address-group-add-person-modal';

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
    private modalController: ModalController,
  ) {
    this.group = navParams.data;
  }

  public ionViewDidEnter(): void {
    if (!this.group.id) {
      this.backToGroups();
    } else {
      this.loadUser();
    }
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
          text: 'Edit group',
          handler: () => {
            this.presentGroupModal();
          }
        },
        {
          text: 'Add person',
          handler: () => {
            this.presentGroupAddPersonModal();
          }
        },
        {
          text: 'Delete group',
          role: 'destructive',
          handler: () => {
            this.groupProvider.destory(this.group.id)
              .subscribe(() => this.backToGroups());
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
