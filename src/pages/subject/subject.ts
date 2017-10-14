import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  ActionSheetController,
  ModalController
} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { SubjectDetailPage } from './../pages';
import { SubjectModalPage } from './../subject-modal/subject-modal';
import { SubjectProvider, Subject } from './../../providers/api-services/subjects';
import { UserInfoProvider } from './../../providers/user-info';

@IonicPage()
@Component({
  selector: 'page-subject',
  templateUrl: 'subject.html',
})
export class SubjectPage {

  private translation;

  public subjects: Subject[];
  public archivedSubjects: Subject[];
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private subjectProvider: SubjectProvider,
    private userInfoProvider: UserInfoProvider,
    private translateService: TranslateService,
  ) {
    this.translateService.get([
      'CANCEL',
      'NEW_SUBJECT',
    ]).subscribe(translation => this.translation = translation);
  }

  public ionViewDidEnter(): void {
    this.loadSubjects();
  }

  public goToDetail(subject: Subject): void {
    this.navCtrl.push(SubjectDetailPage, subject);
  }

  public get canAddSubject(): boolean {
    return this.userInfoProvider.isTeacherOrAdmin();
  }

  public openActions(): void {
    let actionSheet = this.actionSheetController.create({
      buttons: [
        {
          text: this.translation.NEW_SUBJECT,
          handler: () => {
            this.presentModal();
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

  private presentModal(): void {
    let modal = this.modalController.create(SubjectModalPage);
    modal.onDidDismiss(() => this.loadSubjects());
    modal.present();
  }

  private loadSubjects(): void {
    this.subjects = [];
    this.archivedSubjects = [];
    this.loading = true;
    this.subjectProvider.getAll()
      .subscribe(data => {
        this.loading = false;
        this.subjects = data.filter(item => item.archived === false);
        this.archivedSubjects = data.filter(item => item.archived === true);
      });
  }

}
