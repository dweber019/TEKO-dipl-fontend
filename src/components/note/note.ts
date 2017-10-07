import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'component-note',
  templateUrl: 'note.html',
})
export class NoteComponent {

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
  }

}
