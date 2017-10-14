import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgRadio } from 'ng-radio';

import { LessonDetailPage } from './../../pages/pages';
import { SubjectProvider, Subject, Lesson } from './../../providers/api-services/subjects';

@Component({
  selector: 'compnent-subject-lesson',
  templateUrl: 'subject-lesson.html',
})
export class SubjectLessonComponent {

  public subject: Subject;
  public lessons: Lesson[];
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private subjectProvider: SubjectProvider,
    private ngRadio: NgRadio,
  ) {
    this.subject = this.navParams.data;
  }

  public ngOnInit(): void {
    if (this.subject.id) {
      this.loadLessons();
    }

    this.ngRadio.on('subject:lesson:*')
      .subscribe(() => this.loadLessons());
  }

  public goToLesson(lesson: Lesson): void {
    this.navCtrl.push(LessonDetailPage, { name: this.subject.name, lesson });
  }

  private loadLessons(): void {
    this.lessons = [];
    this.loading = true;
    this.subjectProvider.getLessons(this.subject.id)
      .subscribe(data => {
        this.loading = false;
        this.lessons = data;
      })
  }

}
