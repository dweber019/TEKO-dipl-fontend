import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  ) {
    this.lesson = this.navParams.get('lesson');
  }

  public ngOnInit(): void {
    if (this.lesson) {
      this.loadTasks();
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

}
