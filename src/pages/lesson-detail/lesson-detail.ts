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
import { LessonProvider, Lesson } from './../../providers/api-services/lessons';
import { SubjectProvider } from './../../providers/api-services/subjects';
import { CommentModalPage } from './../comment-modal/comment-modal';
import { LessonModalPage } from './../lesson-modal/lesson-modal';
import { TaskModalPage } from './../task-modal/task-modal';
import { UserInfoProvider } from './../../providers/user-info';

@IonicPage()
@Component({
  selector: 'page-lesson-detail',
  templateUrl: 'lesson-detail.html',
})
export class LessonDetailPage {

  private translation;

  public tab: string = 'task';
  public lesson: Lesson;
  public subjectName: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private subjectProvider: SubjectProvider,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private ngRadio: NgRadio,
    private lessonProvider: LessonProvider,
    private userInfoProvider: UserInfoProvider,
    private translateService: TranslateService,
  ) {
    this.subjectName = this.navParams.get('name');
    this.lesson = this.navParams.get('lesson');

    this.translateService.get([
      'CANCEL',
      'NEW_TASK',
      'EDIT_LESSON',
      'DELETE_LESSON',
      'NEW_COMMENT',
    ]).subscribe(translation => this.translation = translation);
  }

  public ionViewDidEnter(): void {
    if (!this.lesson) {
      this.navCtrl.setRoot(SubjectPage);
    } else if (!this.subjectName) {
      this.subjectProvider.get(this.lesson.subjectId)
        .subscribe(subject => this.subjectName = subject.name);
    }
  }

  public get shouldShowMore(): boolean {
    if (this.tab === 'task' && this.canModifyLesson()) {
      return true;
    }
    if (this.tab === 'note' && this.canModifyLesson()) {
      return true;
    }
    if (this.tab === 'comment') {
      return true;
    }

    return false;
  }

  public canModifyLesson(): boolean {
    return this.userInfoProvider.isAdmin() || this.userInfoProvider.isTeacher();
  }

  public openActions(): void {
    let actionSheet = this.actionSheetController.create({
      buttons: [
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

  private presentEditLessonModal(): void {
    let modal = this.modalController.create(LessonModalPage, { lesson: this.lesson });
    modal.onDidDismiss(() => this.ngRadio.cast('lesson:edit'));
    modal.present();
  }

  private presentNewTaskModal(): void {
    let modal = this.modalController.create(TaskModalPage, { lesson: this.lesson });
    modal.onDidDismiss(() => this.ngRadio.cast('lesson:task:add'));
    modal.present();
  }

  private presentNewCommentModal(): void {
    let modal = this.modalController.create(CommentModalPage, { lesson: this.lesson });
    modal.onDidDismiss(() => this.ngRadio.cast('lesson:comment:add'));
    modal.present();
  }

  private getActionsheetButtons(): ActionSheetButton[] {
    let buttons = [];
    if (this.canModifyLesson()) {
      buttons.push({
        text: this.translation.EDIT_LESSON,
        handler: () => {
          this.presentEditLessonModal();
        }
      });
      buttons.push({
        text: this.translation.DELETE_LESSON,
        handler: () => {
          this.lessonProvider.destory(this.lesson.id)
            .subscribe(() => {
              this.navCtrl.pop();
              this.ngRadio.cast('subject:lesson:delete');
            });
        }
      });
    }

    if (this.tab === 'task' && this.canModifyLesson()) {
      buttons.push({
        text: this.translation.NEW_TASK,
        handler: () => {
          this.presentNewTaskModal();
        }
      });
    }
    if (this.tab === 'comment') {
      buttons.push({
        text: this.translation.NEW_COMMENT,
        handler: () => {
          this.presentNewCommentModal();
        }
      });
    }

    return buttons;
  }

}
