import { UserInfoProvider } from './../../providers/user-info';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { UserProvider, User } from './../../providers/api-services/users';

@Component({
  selector: 'page-chat-modal',
  templateUrl: 'chat-modal.html',
})
export class ChatModalPage {

  public subjectForm: FormGroup;
  public user: User;
  public users: User[];

  constructor(
    private viewController: ViewController,
    private formBuilder: FormBuilder,
    private userProvider: UserProvider,
    private userInfoProvider: UserInfoProvider,
  ) {
    this.user = this.userInfoProvider.getUser();

    this.userProvider.getAll()
      .subscribe(data => this.users = data.filter(item => item.id !== this.user.id));

    this.subjectForm = this.formBuilder.group({
      receiver: new FormControl('', Validators.compose([Validators.required])),
      message: new FormControl('', Validators.compose([Validators.maxLength(512), Validators.required])),
    });
  }

  public close(): void {
    this.viewController.dismiss();
  }

  public save(): void {
    if (this.subjectForm.valid) {
      this.userProvider.createChat({
        senderId: this.user.id,
        receiverId: this.subjectForm.get('receiver').value,
        message: this.subjectForm.get('message').value,
      }).subscribe(() => {
        this.viewController.dismiss();
      });
    }
  }

}
