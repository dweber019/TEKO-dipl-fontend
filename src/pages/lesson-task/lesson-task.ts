import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TaskDetailPage } from './../pages';

/**
 * Generated class for the LessonTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lesson-task',
  templateUrl: 'lesson-task.html',
})
export class LessonTaskPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonTaskPage');
  }

  public goToDetail(): void {
    this.navParams.data.navCtrl(TaskDetailPage, 'TaskId');
  }

}
