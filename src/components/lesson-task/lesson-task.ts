import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgRadio } from 'ng-radio';

import { TaskDetailPage } from './../../pages/pages';
import { LessonProvider, Lesson, Task } from './../../providers/api-services/lessons';

@Component({
  selector: 'component-lesson-task',
  templateUrl: 'lesson-task.html',
})
export class LessonTaskCompnent {

  public lesson: Lesson;
  public tasks: Task[];
  public loading: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lessonProvider: LessonProvider,
    private ngRadio: NgRadio,
  ) {
    this.lesson = this.navParams.get('lesson');
  }

  public ngOnInit(): void {
    if (this.lesson) {
      this.loadTasks();

      this.ngRadio.on('lesson:edit').subscribe(() => this.reloadLesson());
      this.ngRadio.on('lesson:task:*').subscribe(() => this.loadTasks());
    }
  }

  public goToTask(task: Task): void {
    this.navCtrl.push(TaskDetailPage, task);
  }

  private loadTasks(): void {
    this.tasks = [];
    this.loading = true;
    this.lessonProvider.getTasks(this.lesson.id)
      .subscribe(data => {
        this.loading = false;
        this.tasks = data;
      })
  }

  private reloadLesson(): void {
    this.lessonProvider.get(this.lesson.id)
      .subscribe(lesson => this.lesson = lesson);
  }

}
