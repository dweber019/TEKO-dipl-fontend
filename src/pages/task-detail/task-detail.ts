import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TaskItemPage, NotePage, CommentPage } from './../pages';

/**
 * Generated class for the TaskDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {

  public TaskItemTab: string;
  public TaskNoteTab: string;
  public TaskCommentTab: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.TaskItemTab = TaskItemPage;
    this.TaskNoteTab = NotePage;
    this.TaskCommentTab = CommentPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDetailPage');
  }

}
