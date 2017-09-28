import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SubjectLessonPage, SubjectStudentPage, SubjectGradePage } from './../pages';

/**
 * Generated class for the SubjectDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subject-detail',
  templateUrl: 'subject-detail.html',
})
export class SubjectDetailPage {

  public subjectLessonTab: string;
  public subjectStudentTab: string;
  public subjectGradeTab: string;

  public navData;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.subjectLessonTab = SubjectLessonPage;
    this.subjectStudentTab = SubjectStudentPage;
    this.subjectGradeTab = SubjectGradePage;

    this.navData = {
      navCtrl: (page, params) => this.navCtrl.push(page, params),
      data: ''
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubjectDetailPage');
  }

}
