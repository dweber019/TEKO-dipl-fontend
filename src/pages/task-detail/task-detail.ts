import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SubjectPage } from './../pages';
import { Task } from './../../models/Task';

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
    private navParams: NavParams
  ) {
    this.task = this.navParams.data;
  }

  public ionViewDidEnter(): void {
    if (!this.task.id) {
      this.navCtrl.setRoot(SubjectPage);
    }
  }

}
