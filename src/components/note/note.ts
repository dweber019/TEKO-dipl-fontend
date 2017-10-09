import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LessonProvider, Note } from './../../providers/api-services/lessons';
import { TaskProvider } from './../../providers/api-services/tasks';

@Component({
  selector: 'component-note',
  templateUrl: 'note.html',
})
export class NoteComponent {

  @Input() entity: string;
  public ckeditorContent: string;
  public loading: boolean = false;
  public showEditor: boolean = false;
  public id: number;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private lessonProvider: LessonProvider,
    private taskProvider: TaskProvider,
  ) { }

  public ngOnInit(): void {
    this.loading = true;
    if (this.entity === 'lesson') {
      this.id = this.navParams.get('lesson').id;
      this.lessonProvider.getNote(this.id)
        .subscribe(data => this.loadNote(data))
    } else {
      this.id = this.navParams.data.id;
      this.taskProvider.getNote(this.id)
        .subscribe(data => this.loadNote(data))
    }
  }

  public onChange(): void {
    if (this.entity === 'lesson') {
      this.lessonProvider.updateNote(this.id, this.ckeditorContent).subscribe();
    } else {
      this.taskProvider.updateNote(this.id, this.ckeditorContent).subscribe();
    }
  }

  private loadNote(data: Note): void {
    this.loading = false;
    this.ckeditorContent = data.note;
    this.showEditor = true;
  }

}
