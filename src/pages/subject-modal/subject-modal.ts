import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { UserProvider, User } from './../../providers/api-services/users';
import { UserType } from './../../models/UserType';
import { SubjectProvider, Subject } from './../../providers/api-services/subjects';

@Component({
  selector: 'page-subject-modal',
  templateUrl: 'subject-modal.html',
})
export class SubjectModalPage {

  public subjectForm: FormGroup;
  public users: User[];
  public subject: Subject;

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private userProvider: UserProvider,
    private subjectProvider: SubjectProvider,
  ) {
    this.subject = this.navParams.data;

    this.userProvider.getAll()
      .subscribe(data => this.users = data.filter(item => item.type === UserType.TEACHER || item.type === UserType.ADMIN));

    this.subjectForm = this.formBuilder.group({
      name: new FormControl(this.subject.name, Validators.compose([Validators.maxLength(250), Validators.required])),
      archived: new FormControl(this.subject.archived || false, Validators.compose([Validators.required])),
      teacherId: new FormControl(this.subject.teacherId, Validators.compose([Validators.required])),
    });
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      if (!this.subject.id) {
        this.createSubject();
      } else {
        this.updateSubject();
      }
    }
  }

  private createSubject(): void {
    this.subjectProvider.create({
      name: this.subjectForm.get('name').value,
      archived: this.subjectForm.get('archived').value,
      teacherId: this.subjectForm.get('teacherId').value,
    }).subscribe(() => this.viewController.dismiss());
  }

  private updateSubject(): void {
    this.subjectProvider.update({
      id: this.subject.id,
      name: this.subjectForm.get('name').value,
      archived: this.subjectForm.get('archived').value,
      teacherId: this.subjectForm.get('teacherId').value,
    }).subscribe(() => this.viewController.dismiss());
  }

}
