import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  ActionSheetController,
  ModalController
} from 'ionic-angular';

import { SubjectDetailPage } from './../pages';
import { SubjectModalPage } from './../subject-modal/subject-modal';

/**
 * Generated class for the SubjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subject',
  templateUrl: 'subject.html',
})
export class SubjectPage {

  constructor(
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController
  ) {
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad SubjectPage');

    this.presentModal();
  }

  public goToDetail(): void {
    this.navCtrl.push(SubjectDetailPage, 'subjectId');
  }

  public openActions(): void {
    let actionSheet = this.actionSheetController.create({
      title: 'More Actions',
      buttons: [
        {
          text: 'New Subject',
          handler: () => {
            this.presentModal();
          }
        }
      ]
    });
    actionSheet.present();
  }

  private presentModal(): void {
    let modal = this.modalController.create(SubjectModalPage);
    modal.present();
  }

}
