import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';

import { TaskProvider, Task } from './../../providers/api-services/tasks';
import { LessonProvider, Lesson } from './../../providers/api-services/lessons';
import { LessonType } from './../../models/LessonType';

@IonicPage()
@Component({
  selector: 'page-task-modal',
  templateUrl: 'task-modal.html',
})
export class TaskModalPage {

  public subjectForm: FormGroup;
  public lesson: Lesson;
  public task: Task;
  public now = moment().format('YYYY-MM-DDTHH:mm');

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private taskProvider: TaskProvider,
    private lessonProvider: LessonProvider,
  ) {
    this.task = this.navParams.get('task') || {};
    this.lesson = this.navParams.get('lesson') || {};

    this.subjectForm = this.formBuilder.group({
      dueDate: new FormControl(this.task.dueDate && this.task.dueDate.format('YYYY-MM-DDTHH:mm'), Validators.compose([Validators.required])),
      name: new FormControl(this.task.name, Validators.compose([Validators.required])),
      description: new FormControl(this.task.description, Validators.compose([])),
    });
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      if (this.lesson.id) {
        this.createLesson();
      } else {
        this.updateLesson();
      }
    }
  }

  private createLesson(): void {
    this.lessonProvider.createTask(this.lesson.id, this.getTaskObject()).subscribe(() => this.viewController.dismiss());
  }

  private updateLesson(): void {
    this.taskProvider.update(this.task.id, this.getTaskObject()).subscribe(() => this.viewController.dismiss());
  }

  private getTaskObject(): any {
    return {
      dueDate: moment(this.subjectForm.get('dueDate').value).format('YYYY-MM-DD HH:mm:ss'),
      name: this.subjectForm.get('name').value,
      description: this.subjectForm.get('description').value,
    };
  }

}
