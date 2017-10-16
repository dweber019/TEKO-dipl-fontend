import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { GroupProvider, Group } from './../../providers/api-services/groups';

@Component({
  selector: 'page-address-group-modal',
  templateUrl: 'address-group-modal.html',
})
export class AddressGroupModalPage {

  public subjectForm: FormGroup;
  public group: Group;

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private groupProvider: GroupProvider,
  ) {
    this.group = this.navParams.data;

    this.subjectForm = this.formBuilder.group({
      name: new FormControl(this.group.name, Validators.compose([Validators.maxLength(150), Validators.required])),
    });
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      if (this.group.id) {
        this.updateGroup();
      } else {
        this.createGroup();
      }
    }
  }

  private createGroup(): void {
    this.groupProvider.create({
      name: this.subjectForm.get('name').value,
    }).subscribe(() => {
      this.viewController.dismiss();
    });
  }

  private updateGroup(): void {
    this.groupProvider.update({
      id: this.group.id,
      name: this.subjectForm.get('name').value,
    }).subscribe(() => {
      this.viewController.dismiss();
    });
  }

}
