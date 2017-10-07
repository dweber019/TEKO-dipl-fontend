import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SubjectPage } from './../pages';
import { Lesson } from './../../models/Lesson';

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
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.subjectName = this.navParams.get('name');
    this.lesson = this.navParams.get('lesson');
  }

  public ionViewDidEnter(): void {
    if (!this.lesson) {
      this.navCtrl.setRoot(SubjectPage);
    }
  }

}
