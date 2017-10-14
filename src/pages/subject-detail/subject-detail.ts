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
  ) {
    this.subject = this.navParams.data;
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
          text: 'Edit Subject',
          handler: () => {
            this.presentSubjectEditModal();
          }
        },
        {
          text: 'Delete Subject',
          handler: () => {
            this.subjectProvider.destory(this.subject.id)
              .subscribe(() => this.navCtrl.pop());
          }
        },
        ...this.getActionsheetButtons(),
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
          text: 'New lesson',
          handler: () => {
            this.presentNewLessonModal();
          }
        },
      ];
    }
    if (this.tab === 'student') {
      return [
        {
          text: 'Add person',
          handler: () => {
            this.presentNewStudentModal();
          }
        },
      ];
    }
    if (this.tab === 'grade') {
      return [
        {
          text: 'New grade',
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
