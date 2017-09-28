import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'component-note',
  templateUrl: 'note.html',
})
export class NoteComponent {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
