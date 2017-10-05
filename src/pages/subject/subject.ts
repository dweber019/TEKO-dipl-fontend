import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  ActionSheetController,
  ModalController
} from 'ionic-angular';

import { SubjectDetailPage } from './../pages';
import { SubjectModalPage } from './../subject-modal/subject-modal';
import { SubjectProvider, Subject } from './../../providers/api-services/subjects';

@IonicPage()
@Component({
  selector: 'page-subject',
  templateUrl: 'subject.html',
})
export class SubjectPage {

  public subjects: Subject[];

  constructor(
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private subjectProvider: SubjectProvider,
  ) {
  }

  public ionViewDidEnter(): void {
    this.loadSubjects();
  }

  public goToDetail(subject: Subject): void {
    this.navCtrl.push(SubjectDetailPage, subject);
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

  private loadSubjects(): void {
    this.subjectProvider.getAll()
      .subscribe(data => this.subjects = data);
  }

}
