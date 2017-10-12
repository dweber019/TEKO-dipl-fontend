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
import { TaskProvider, Task } from './../../providers/api-services/tasks';
import { TaskModalPage } from './../task-modal/task-modal';
import { CommentModalPage } from './../comment-modal/comment-modal';

@IonicPage()
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {

  public tab: string = 'task';
  public task: Task;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private ngRadio: NgRadio,
    private taskProvider: TaskProvider,
  ) {
    this.task = this.navParams.data;
  }

  public ionViewDidEnter(): void {
    if (!this.task.id) {
      this.navCtrl.setRoot(SubjectPage);
    }
  }

  public openActions(): void {
    let actionSheet = this.actionSheetController.create({
      buttons: [
        {
          text: 'Edit task',
          handler: () => {
            this.presentEditTaskModal();
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

  private getActionsheetButtons(): ActionSheetButton[] {
    if (this.tab === 'task') {
      return [
        {
          text: 'Task Items edititeren',
          handler: () => {
            // this.presentNewTaskModal();
          }
        },
      ];
    }
    if (this.tab === 'comment') {
      return [
        {
          text: 'Add comment',
          handler: () => {
            this.presentNewCommentModal();
          }
        },
      ];
    }
  }

  private realoadTask(): void {
    this.taskProvider.get(this.task.id)
      .subscribe(task => this.task = task);
  }

}
