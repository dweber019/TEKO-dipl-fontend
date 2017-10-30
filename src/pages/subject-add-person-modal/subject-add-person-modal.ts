import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { SubjectProvider, Subject } from './../../providers/api-services/subjects';
import { UserProvider, User } from './../../providers/api-services/users';
import { UserType } from './../../models/UserType';
import { GroupProvider, Group } from './../../providers/api-services/groups';

@Component({
  selector: 'page-subject-add-person-modal',
  templateUrl: 'subject-add-person-modal.html',
})
export class SubjectAddPersonModalPage {

  public subjectForm: FormGroup;
  public subject: Subject;
  public users: User[];
  public groups: Group[];

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private subjectProvider: SubjectProvider,
    private userProvider: UserProvider,
    private groupProvider: GroupProvider,
  ) {
    this.subject = this.navParams.data;

    this.userProvider.getAll()
      .subscribe(data => this.users = data.filter(item => item.type === UserType.STUDENT));

    this.groupProvider.getAll()
      .subscribe(data => this.groups = data);

    this.subjectForm = this.formBuilder.group({
      persons: new FormControl([], Validators.compose([])),
      group: new FormControl('', Validators.compose([])),
    }, {validator: this.personsOrGroupValidator});
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      if (this.subjectForm.get('group').value) {
        this.groupProvider.getUsers(this.subjectForm.get('group').value)
          .subscribe(users => {
            let obs = [];
            users.forEach(element => {
              obs.push(this.subjectProvider.addUser(this.subject.id, element.id));
            });
            Observable.forkJoin(obs).subscribe(() => this.viewController.dismiss());
          });
      } else {
        let obs = [];
        this.subjectForm.get('persons').value.forEach(element => {
          obs.push(this.subjectProvider.addUser(this.subject.id, element));
        });
        Observable.forkJoin(obs).subscribe(() => this.viewController.dismiss());
      }
    }
  }

  private personsOrGroupValidator(formGroup): any {
    var persons, group;
    for(var controlName in formGroup.controls) {
      if(controlName.indexOf("persons") !== -1) {
        persons = formGroup.controls[controlName].value;
      }
      if(controlName.indexOf("group") !== -1) {
        group = formGroup.controls[controlName].value;
      }
    }
    return !!group || (persons && persons.length > 0) ? null : { personsOrGroup: true };
  }

}
