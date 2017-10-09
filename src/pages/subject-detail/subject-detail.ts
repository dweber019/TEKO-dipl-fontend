import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SubjectPage } from './../pages';
import { Subject } from './../../models/Subject';

@IonicPage()
@Component({
  selector: 'page-subject-detail',
  templateUrl: 'subject-detail.html',
})
export class SubjectDetailPage {

  public tab: string = 'lesson';

  public subject: Subject;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
    this.subject = this.navParams.data;
  }

  public ionViewDidEnter(): void {
    if (!this.subject.id) {
      this.navCtrl.setRoot(SubjectPage);
    }
  }

}
