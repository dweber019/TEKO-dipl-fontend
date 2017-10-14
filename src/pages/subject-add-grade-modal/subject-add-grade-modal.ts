import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { SubjectProvider, Subject } from './../../providers/api-services/subjects';
import { User } from './../../providers/api-services/users';

@IonicPage()
@Component({
  selector: 'page-subject-add-grade-modal',
  templateUrl: 'subject-add-grade-modal.html',
})
export class SubjectAddGradeModalPage {

  public subjectForm: FormGroup;
  public subject: Subject;
  public users: User[];

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private subjectProvider: SubjectProvider,
  ) {
    this.subject = this.navParams.data;

    this.subjectProvider.getUsers(this.subject.id)
      .subscribe(data => this.users = data);

    this.subjectForm = this.formBuilder.group({
      person: new FormControl([], Validators.compose([Validators.required])),
      grade: new FormControl([], Validators.compose([Validators.required])),
    });
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      this.subjectProvider.addGrade(
        this.subject.id,
        this.subjectForm.get('person').value,
        this.subjectForm.get('grade').value,
      ).subscribe(() => this.viewController.dismiss());
    }
  }

}
