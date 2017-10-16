import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { SubjectProvider, Subject } from './../../providers/api-services/subjects';
import { UserProvider, User } from './../../providers/api-services/users';
import { UserType } from './../../models/UserType';

@Component({
  selector: 'page-subject-add-person-modal',
  templateUrl: 'subject-add-person-modal.html',
})
export class SubjectAddPersonModalPage {

  public subjectForm: FormGroup;
  public subject: Subject;
  public users: User[];

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private subjectProvider: SubjectProvider,
    private userProvider: UserProvider,
  ) {
    this.subject = this.navParams.data;

    this.userProvider.getAll()
      .subscribe(data => this.users = data.filter(item => item.type === UserType.STUDENT));

    this.subjectForm = this.formBuilder.group({
      persons: new FormControl([], Validators.compose([Validators.min(1), Validators.required])),
    });
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      let obs = [];
      this.subjectForm.get('persons').value.forEach(element => {
        obs.push(this.subjectProvider.addUser(this.subject.id, element));
      });
      Observable.forkJoin(obs).subscribe(() => this.viewController.dismiss());
    }
  }

}
