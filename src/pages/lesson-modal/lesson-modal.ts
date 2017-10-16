import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';

import { SubjectProvider, Subject } from './../../providers/api-services/subjects';
import { LessonProvider, Lesson } from './../../providers/api-services/lessons';
import { LessonType } from './../../models/LessonType';

@Component({
  selector: 'page-lesson-modal',
  templateUrl: 'lesson-modal.html',
})
export class LessonModalPage {

  public subjectForm: FormGroup;
  public subject: Subject;
  public lesson: Lesson;
  public now = moment().format('YYYY-MM-DDTHH:mm');

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private subjectProvider: SubjectProvider,
    private lessonProvider: LessonProvider,
  ) {
    this.subject = this.navParams.get('subject') || {};
    this.lesson = this.navParams.get('lesson') || {};

    this.subjectForm = this.formBuilder.group({
      startDate: new FormControl(this.lesson.startDate && this.lesson.startDate.format('YYYY-MM-DDTHH:mm'), Validators.compose([Validators.required])),
      endDate: new FormControl(this.lesson.endDate && this.lesson.endDate.format('YYYY-MM-DDTHH:mm'), Validators.compose([Validators.required])),
      location: new FormControl(this.lesson.location, Validators.compose([])),
      room: new FormControl(this.lesson.room, Validators.compose([])),
      canceled: new FormControl(this.lesson.canceled || false, Validators.compose([Validators.required])),
      type: new FormControl(this.lesson.type || LessonType.LESSON, Validators.compose([Validators.required])),
    }, {validator: this.endDateAfterOrEqualValidator});
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      if (this.subject.id) {
        this.createLesson();
      } else {
        this.updateLesson();
      }
    }
  }

  private createLesson(): void {
    this.subjectProvider.createLesson(this.subject.id, this.getLessonObject()).subscribe(() => this.viewController.dismiss());
  }

  private updateLesson(): void {
    this.lessonProvider.update(this.lesson.id, this.getLessonObject()).subscribe(() => this.viewController.dismiss());
  }

  private getLessonObject(): any {
    return {
      startDate: moment(this.subjectForm.get('startDate').value).format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment(this.subjectForm.get('endDate').value).format('YYYY-MM-DD HH:mm:ss'),
      location: this.subjectForm.get('location').value,
      room: this.subjectForm.get('room').value,
      canceled: this.subjectForm.get('canceled').value,
      type: this.subjectForm.get('type').value,
    };
  }

  private endDateAfterOrEqualValidator(formGroup): any {
    var startDateTimestamp, endDateTimestamp;
    for(var controlName in formGroup.controls) {
      if(controlName.indexOf("startDate") !== -1) {
        startDateTimestamp = Date.parse(formGroup.controls[controlName].value);
      }
      if(controlName.indexOf("endDate") !== -1) {
        endDateTimestamp = Date.parse(formGroup.controls[controlName].value);
      }
    }
    return (endDateTimestamp < startDateTimestamp) ? { endDateLessThanStartDate: true } : null;
  }

}
