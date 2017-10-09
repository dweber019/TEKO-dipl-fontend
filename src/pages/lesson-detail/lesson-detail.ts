import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SubjectPage } from './../pages';
import { Lesson } from './../../models/Lesson';
import { SubjectProvider } from './../../providers/api-services/subjects';

@IonicPage()
@Component({
  selector: 'page-lesson-detail',
  templateUrl: 'lesson-detail.html',
})
export class LessonDetailPage {

  public tab: string = 'task';
  public lesson: Lesson;
  public subjectName: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private subjectProvider: SubjectProvider,
  ) {
    this.subjectName = this.navParams.get('name');
    this.lesson = this.navParams.get('lesson');
  }

  public ionViewDidEnter(): void {
    if (!this.lesson) {
      this.navCtrl.setRoot(SubjectPage);
    } else if (!this.subjectName) {
      this.subjectProvider.get(this.lesson.subjectId)
        .subscribe(subject => this.subjectName = subject.name);
    }
  }

}
