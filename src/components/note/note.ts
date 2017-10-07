import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LessonProvider, Note, Lesson } from './../../providers/api-services/lessons';

@Component({
  selector: 'component-note',
  templateUrl: 'note.html',
})
export class NoteComponent {

  @Input() entity: string;
  public ckeditorContent: string;
  public loading: boolean = false;
  public showEditor: boolean = false;
  public lesson: Lesson;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private lessonProvider: LessonProvider,
  ) {
    this.lesson = this.navParams.get('lesson');
  }

  public ngOnInit(): void {
    this.loading = true;
    if (this.entity === 'lesson') {
      this.lessonProvider.getNote(this.lesson.id)
        .subscribe(data => {
          this.loading = false;
          this.ckeditorContent = data.note;
          this.showEditor = true;
        })
    }
  }

  public onChange(): void {
    if (this.entity === 'lesson') {
      this.lessonProvider.updateNote(this.lesson.id, this.ckeditorContent).subscribe();
    }
  }

}
