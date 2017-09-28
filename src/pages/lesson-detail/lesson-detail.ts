import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LessonTaskPage, NotePage, CommentPage } from './../pages';

/**
 * Generated class for the LessonDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lesson-detail',
  templateUrl: 'lesson-detail.html',
})
export class LessonDetailPage {

  public lessonTaskTab: string;
  public lessonNoteTab: string;
  public lessonCommentTab: string;

  public navData;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.lessonTaskTab = LessonTaskPage;
    this.lessonNoteTab = NotePage;
    this.lessonCommentTab = CommentPage;

    this.navData = {
      navCtrl: (page, params) => this.navCtrl.push(page, params),
      data: ''
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonDetailPage');
  }

}
