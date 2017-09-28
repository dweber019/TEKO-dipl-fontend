import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LessonDetailPage } from './../../pages/pages';

@Component({
  selector: 'compnent-subject-lesson',
  templateUrl: 'subject-lesson.html',
})
export class SubjectLessonComponent {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubjectLessonPage');
  }

  public goToDetail(): void {
    this.navCtrl.push(LessonDetailPage, 'subjectId');
  }

}
