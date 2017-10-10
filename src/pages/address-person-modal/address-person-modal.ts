import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { UserProvider } from './../../providers/api-services/users';

@IonicPage()
@Component({
  selector: 'page-address-person-modal',
  templateUrl: 'address-person-modal.html',
})
export class AddressPersonModalPage {

  public subjectForm: FormGroup;

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private userProvider: UserProvider,
  ) {
    this.subjectForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      type: new FormControl('student', Validators.compose([Validators.required])),
      inviteEmail: new FormControl('', Validators.compose([Validators.email])),
    });
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      this.userProvider.create({
        firstname: this.subjectForm.get('firstName').value,
        lastname: this.subjectForm.get('lastName').value,
        type: this.subjectForm.get('type').value,
        inviteEmail: this.subjectForm.get('inviteEmail').value,
      }).subscribe(() => {
        this.viewController.dismiss();
      });
    }
  }

}
