import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

/**
 * Generated class for the SubjectModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subject-modal',
  templateUrl: 'subject-modal.html',
})
export class SubjectModalPage {

  public subjectForm: FormGroup;

  constructor(
    private navParams: NavParams,
    private viewController: ViewController,
    private formBuilder: FormBuilder
  ) {
    this.subjectForm = this.formBuilder.group({
      firstName: new FormControl('Nancy', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
    });
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      this.viewController.dismiss();
    }
  }

}
