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
import { TaskProvider, Task } from './../../providers/api-services/tasks';
import { TaskModalPage } from './../task-modal/task-modal';
import { CommentModalPage } from './../comment-modal/comment-modal';
import { TaskItemModalPage } from './../task-item-modal/task-item-modal';
import { UserInfoProvider } from './../../providers/user-info';

@IonicPage()
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {

  private translation;

  public tab: string = 'task';
  public task: Task;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private ngRadio: NgRadio,
    private taskProvider: TaskProvider,
    private userInfoProvider: UserInfoProvider,
    private translateService: TranslateService,
  ) {
    this.task = this.navParams.data;

    this.translateService.get([
      'CANCEL',
      'EDIT_TASK',
      'DELETE_TASK',
      'NEW_TASK_ITEM',
      'NEW_COMMENT',
      'TASK_SUBMIT',
    ]).subscribe(translation => this.translation = translation);
  }

  public ionViewDidEnter(): void {
    if (!this.task.id) {
      this.navCtrl.setRoot(SubjectPage);
    }
  }

  public get shouldShowMore(): boolean {
    if (this.tab === 'task') {
      return true;
    }
    if (this.tab === 'note') {
      return true;
    }
    if (this.tab === 'comment') {
      return true;
    }

    return false;
  }

  public canModifyTask(): boolean {
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

  public get showResult(): boolean {
    return this.userInfoProvider.isAdmin() || this.userInfoProvider.isTeacher();
  }

  private presentEditTaskModal(): void {
    let modal = this.modalController.create(TaskModalPage, { task: this.task });
    modal.onDidDismiss(() => {
      this.ngRadio.cast('task:edit');
      this.realoadTask();
    });
    modal.present();
  }

  private presentNewCommentModal(): void {
    let modal = this.modalController.create(CommentModalPage, { task: this.task });
    modal.onDidDismiss(() => this.ngRadio.cast('task:comment:add'));
    modal.present();
  }

  private presentNewTaskItemModal(): void {
    let modal = this.modalController.create(TaskItemModalPage, { task: this.task });
    modal.onDidDismiss(() => this.ngRadio.cast('taskitem:add'));
    modal.present();
  }

  private getActionsheetButtons(): ActionSheetButton[] {
    let buttons = [];
    if (this.canModifyTask()) {
      buttons.push({
        text: this.translation.EDIT_TASK,
        handler: () => {
          this.presentEditTaskModal();
        }
      });
      buttons.push({
        text: this.translation.DELETE_TASK,
        handler: () => {
          this.taskProvider.destory(this.task.id)
            .subscribe(() => {
              this.navCtrl.pop();
              this.ngRadio.cast('lesson:task:delete');
            });
        }
      });
    }

    if (this.tab === 'task' && this.canModifyTask()) {
      buttons.push({
        text: this.translation.NEW_TASK_ITEM,
        handler: () => {
          this.presentNewTaskItemModal();
        }
      });
    }
    if (this.userInfoProvider.isStudent()) {
      buttons.push({
        text: this.translation.TASK_SUBMIT,
        handler: () => {
          this.taskProvider.doneTask(this.task.id).subscribe(() => this.navCtrl.pop());
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

  private realoadTask(): void {
    this.taskProvider.get(this.task.id)
      .subscribe(task => this.task = task);
  }

}
