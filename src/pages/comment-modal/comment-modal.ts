import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { TaskProvider, Task } from './../../providers/api-services/tasks';
import { LessonProvider, Lesson, Comment } from './../../providers/api-services/lessons';
import { CommentProvider } from './../../providers/api-services/comments';

@Component({
  selector: 'page-comment-modal',
  templateUrl: 'comment-modal.html',
})
export class CommentModalPage {

  public subjectForm: FormGroup;
  private lesson: Lesson;
  private task: Task;
  private comment: Comment;

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private lessonProvider: LessonProvider,
    private taskProvider: TaskProvider,
    private commentProvider: CommentProvider,
  ) {
    this.lesson = this.navParams.get('lesson') || {};
    this.task = this.navParams.get('task') || {};
    this.comment = this.navParams.get('comment') || {};

    this.subjectForm = this.formBuilder.group({
      message: new FormControl(this.comment.message, Validators.compose([Validators.maxLength(512), Validators.required])),
    });
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      if (this.comment.id) {
        this.commentProvider.update(this.comment.id, this.subjectForm.get('message').value)
          .subscribe(() => this.viewController.dismiss());
      } else {
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

}
