import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TaskDetailPage } from './../../pages/pages';

@Component({
  selector: 'component-lesson-task',
  templateUrl: 'lesson-task.html',
})
export class LessonTaskCompnent {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonTaskPage');
  }

  public goToDetail(): void {
    this.navCtrl.push(TaskDetailPage, 'TaskId');
  }

}
