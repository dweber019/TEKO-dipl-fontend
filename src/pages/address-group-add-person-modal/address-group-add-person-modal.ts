import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { GroupProvider, Group } from './../../providers/api-services/groups';
import { UserProvider, User } from './../../providers/api-services/users';
import { UserType } from './../../models/UserType';

@Component({
  selector: 'page-address-group-add-person-modal',
  templateUrl: 'address-group-add-person-modal.html',
})
export class AddressGroupAddPersonModalPage {

  public subjectForm: FormGroup;
  public group: Group;
  public users: User[];

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private groupProvider: GroupProvider,
    private userProvider: UserProvider,
  ) {
    this.group = this.navParams.data;

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
        obs.push(this.groupProvider.addUser(this.group.id, element));
      });
      Observable.forkJoin(obs)
        .subscribe(
          () => this.viewController.dismiss()
        );
    }
  }

}
