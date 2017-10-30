import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { UserProvider, User } from './../../providers/api-services/users';

@Component({
  selector: 'page-address-person-modal',
  templateUrl: 'address-person-modal.html',
})
export class AddressPersonModalPage {

  public subjectForm: FormGroup;
  public user: User;

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private userProvider: UserProvider,
  ) {
    this.user = this.navParams.data;

    this.subjectForm = this.formBuilder.group({
      firstName: new FormControl(this.user.firstname, Validators.compose([Validators.maxLength(150), Validators.required])),
      lastName: new FormControl(this.user.lastname, Validators.compose([Validators.maxLength(150), Validators.required])),
      type: new FormControl(this.user.type || 'student', Validators.compose([Validators.required])),
    });

    if (!this.user.id) {
      this.subjectForm.addControl('inviteEmail', new FormControl('', Validators.compose([Validators.email])));
    }
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      if (this.user.id) {
        this.updateUser();
      } else {
        this.createUser();
      }
    }
  }

  private createUser(): void {
    this.userProvider.create({
      firstname: this.subjectForm.get('firstName').value,
      lastname: this.subjectForm.get('lastName').value,
      type: this.subjectForm.get('type').value,
      inviteEmail: this.subjectForm.get('inviteEmail').value,
    }).subscribe(() => {
      this.viewController.dismiss();
    });
  }

  private updateUser(): void {
    this.userProvider.update({
      id: this.user.id,
      firstname: this.subjectForm.get('firstName').value,
      lastname: this.subjectForm.get('lastName').value,
      type: this.subjectForm.get('type').value,
    }).subscribe(() => {
      this.viewController.dismiss();
    });
  }



}
