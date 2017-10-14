import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ActionSheetButton,
  ModalController
} from 'ionic-angular';
import { NgRadio } from 'ng-radio';
import { TranslateService } from '@ngx-translate/core';

import { SubjectPage } from './../pages';
import { SubjectModalPage } from './../subject-modal/subject-modal';
import { SubjectProvider, Subject } from './../../providers/api-services/subjects';
import { SubjectAddPersonModalPage } from './../subject-add-person-modal/subject-add-person-modal';
import { SubjectAddGradeModalPage } from './../subject-add-grade-modal/subject-add-grade-modal';
import { LessonModalPage } from './../lesson-modal/lesson-modal';
import { UserInfoProvider } from './../../providers/user-info';

@IonicPage()
@Component({
  selector: 'page-subject-detail',
  templateUrl: 'subject-detail.html',
})
export class SubjectDetailPage {

  private translation;

  public tab: string = 'lesson';
  public subject: Subject;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private subjectProvider: SubjectProvider,
    private ngRadio: NgRadio,
    private userInfoProvider: UserInfoProvider,
    private translateService: TranslateService,
  ) {
    this.subject = this.navParams.data;

    this.translateService.get([
      'CANCEL',
      'EDIT_SUBJECT',
      'DELETE_SUBJECT',
      'NEW_LESSON',
      'NEW_PERSON',
      'NEW_GRADE',
    ]).subscribe(translation => this.translation = translation);
  }

  public ionViewDidEnter(): void {
    if (!this.subject.id) {
      this.navCtrl.setRoot(SubjectPage);
    }
  }

  public get canModifySubject(): boolean {
    return this.userInfoProvider.isAdmin() || this.userInfoProvider.isTeacherOf(this.subject.teacherId);
  }

  public openActions(): void {
    let actionSheet = this.actionSheetController.create({
      buttons: [
        {
          text: this.translation.EDIT_SUBJECT,
          handler: () => {
            this.presentSubjectEditModal();
          }
        },
        {
          text: this.translation.DELETE_SUBJECT,
          handler: () => {
            this.subjectProvider.destory(this.subject.id)
              .subscribe(() => this.navCtrl.pop());
          }
        },
        ...this.getActionsheetButtons(),
        {
          text: this.translation.CANCEL,
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

  private presentNewStudentModal(): void {
    let modal = this.modalController.create(SubjectAddPersonModalPage, this.subject);
    modal.onDidDismiss(() => this.ngRadio.cast('subject:student:add'));
    modal.present();
  }

  private presentNewGradeModal(): void {
    let modal = this.modalController.create(SubjectAddGradeModalPage, this.subject);
    modal.onDidDismiss(() => this.ngRadio.cast('subject:grade:add'));
    modal.present();
  }

  private presentNewLessonModal(): void {
    let modal = this.modalController.create(LessonModalPage, { subject: this.subject });
    modal.onDidDismiss(() => this.ngRadio.cast('subject:lesson:add'));
    modal.present();
  }

  private getActionsheetButtons(): ActionSheetButton[] {
    if (this.tab === 'lesson') {
      return [
        {
          text: this.translation.NEW_LESSON,
          handler: () => {
            this.presentNewLessonModal();
          }
        },
      ];
    }
    if (this.tab === 'student') {
      return [
        {
          text: this.translation.NEW_PERSON,
          handler: () => {
            this.presentNewStudentModal();
          }
        },
      ];
    }
    if (this.tab === 'grade') {
      return [
        {
          text: this.translation.NEW_GRADE,
          handler: () => {
            this.presentNewGradeModal();
          }
        },
      ];
    }
  }

  private reloadSubject(): void {
    this.subjectProvider.get(this.subject.id)
      .subscribe(subject => this.subject = subject);
  }

}
