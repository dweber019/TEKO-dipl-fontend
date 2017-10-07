import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TaskDetailPage } from './../../pages/pages';
import { LessonProvider, Lesson } from './../../providers/api-services/lessons';

@Component({
  selector: 'component-lesson-task',
  templateUrl: 'lesson-task.html',
})
export class LessonTaskCompnent {

  public lesson: Lesson;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lessonProvider: LessonProvider,
  ) {
    this.lesson = this.navParams.get('lesson');
  }

  public ionViewDidEnter(): void {

  }

  public goToDetail(): void {
    this.navCtrl.push(TaskDetailPage, 'TaskId');
  }

}
