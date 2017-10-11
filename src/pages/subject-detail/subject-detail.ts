import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ModalController
} from 'ionic-angular';

import { SubjectPage } from './../pages';
import { SubjectModalPage } from './../subject-modal/subject-modal';
import { SubjectProvider, Subject } from './../../providers/api-services/subjects';

@IonicPage()
@Component({
  selector: 'page-subject-detail',
  templateUrl: 'subject-detail.html',
})
export class SubjectDetailPage {

  public tab: string = 'lesson';

  public subject: Subject;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private subjectProvider: SubjectProvider,
  ) {
    this.subject = this.navParams.data;
  }

  public ionViewDidEnter(): void {
    if (!this.subject.id) {
      this.navCtrl.setRoot(SubjectPage);
    }
  }

  public openActions(): void {
    let actionSheet = this.actionSheetController.create({
      buttons: [
        {
          text: 'Edit Subject',
          handler: () => {
            this.presentSubjectEditModal();
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

  private presentSubjectEditModal(): void {
    let modal = this.modalController.create(SubjectModalPage, this.subject);
    modal.onDidDismiss(() => this.reloadSubject());
    modal.present();
  }

  private reloadSubject(): void {
    this.subjectProvider.get(this.subject.id)
      .subscribe(subject => this.subject = subject);
  }

}
