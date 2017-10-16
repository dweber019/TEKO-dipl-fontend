import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { TaskProvider, Task } from './../../providers/api-services/tasks';
import { LessonProvider, Lesson } from './../../providers/api-services/lessons';

@Component({
  selector: 'page-comment-modal',
  templateUrl: 'comment-modal.html',
})
export class CommentModalPage {

  public subjectForm: FormGroup;
  private lesson: Lesson;
  private task: Task;

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private lessonProvider: LessonProvider,
    private taskProvider: TaskProvider,
  ) {
    this.lesson = this.navParams.get('lesson') || {};
    this.task = this.navParams.get('task') || {};

    this.subjectForm = this.formBuilder.group({
      message: new FormControl('', Validators.compose([Validators.maxLength(512), Validators.required])),
    });
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      if (this.lesson.id) {
        this.lessonProvider.createComment(this.lesson.id, this.subjectForm.get('message').value)
          .subscribe(() => this.viewController.dismiss());
      } else {
        this.taskProvider.createComment(this.task.id, this.subjectForm.get('message').value)
          .subscribe(() => this.viewController.dismiss());
      }
    }
  }

}
