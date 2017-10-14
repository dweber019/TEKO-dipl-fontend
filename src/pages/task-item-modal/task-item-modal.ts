import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { TaskProvider, Task } from './../../providers/api-services/tasks';
import { TaskItemProvider, TaskItem } from './../../providers/api-services/taskitems';
import { QuestionType } from './../../models/QuestionType';

@IonicPage()
@Component({
  selector: 'page-task-item-modal',
  templateUrl: 'task-item-modal.html',
})
export class TaskItemModalPage {

  public subjectForm: FormGroup;
  public task: Task;
  public taskItem: TaskItem;

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private taskProvider: TaskProvider,
    private taskItemProvider: TaskItemProvider,
  ) {
    this.task = this.navParams.get('task') || {};
    this.taskItem = this.navParams.get('taskItem') || {};

    this.subjectForm = this.formBuilder.group({
      title: new FormControl(this.taskItem.title, Validators.compose([Validators.required])),
      description: new FormControl(this.taskItem.description, Validators.compose([])),
      questionType: new FormControl(this.taskItem.questionType, Validators.compose([Validators.required])),
      question: new FormControl(this.taskItem.question, Validators.compose([])),
    }, {validator: this.shouldHaveQuestionValidator});
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      if (this.task.id) {
        this.createTaskItem();
      } else {
        this.updateTaskItem();
      }
    }
  }

  public get needsQuestion(): boolean {
    if (this.subjectForm.get('questionType').value === QuestionType.SELECT || this.subjectForm.get('questionType').value === QuestionType.TOGGLE) {
      return true;
    }
    return false;
  }

  private createTaskItem(): void {
    this.taskProvider.createTaskItem(this.task.id, this.getTaskObject()).subscribe(() => this.viewController.dismiss());
  }

  private updateTaskItem(): void {
    this.taskItemProvider.update(this.taskItem.id, this.getTaskObject()).subscribe(() => this.viewController.dismiss());
  }

  private getTaskObject(): any {
    return {
      title: this.subjectForm.get('title').value,
      description: this.subjectForm.get('description').value,
      questionType: this.subjectForm.get('questionType').value,
      question: this.subjectForm.get('question').value,
      order: 1,
    };
  }

  private shouldHaveQuestionValidator(formGroup): any {
    let questionType, question;
    for(var controlName in formGroup.controls) {
      if(controlName.indexOf("questionType") !== -1) {
        questionType = formGroup.controls[controlName].value;
      }
      if(controlName.indexOf("question") !== -1) {
        question = formGroup.controls[controlName].value;
      }
    }
    if ((questionType === QuestionType.SELECT || questionType === QuestionType.TOGGLE) && question === '') {
      return { shouldHaveQuestion: true }
    }
    return null;
  }

}
