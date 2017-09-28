import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'compnent-task-item',
  templateUrl: 'task-item.html',
})
export class TaskItemCompnent {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
