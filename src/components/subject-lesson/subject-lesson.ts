import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LessonDetailPage } from './../../pages/pages';

import { SubjectProvider, Subject } from './../../providers/api-services/subjects';

@Component({
  selector: 'compnent-subject-lesson',
  templateUrl: 'subject-lesson.html',
})
export class SubjectLessonComponent {

  public subject: Subject;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
    this.subject = this.navParams.data;
  }

  public ionViewDidEnter(): void {

  }

  public goToDetail(): void {
    this.navCtrl.push(LessonDetailPage, 'subjectId');
  }

}
