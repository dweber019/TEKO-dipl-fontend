import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { GroupProvider } from './../../providers/api-services/groups';

@IonicPage()
@Component({
  selector: 'page-address-group-modal',
  templateUrl: 'address-group-modal.html',
})
export class AddressGroupModalPage {

  public subjectForm: FormGroup;

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private groupProvider: GroupProvider,
  ) {
    this.subjectForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.required])),
    });
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      this.groupProvider.create({
        name: this.subjectForm.get('name').value,
      }).subscribe(() => {
        this.viewController.dismiss();
      });
    }
  }

}
