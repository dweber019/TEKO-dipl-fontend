import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgRadio } from 'ng-radio';

import { AddressPersonDetailPage } from './../../pages/pages';
import { SubjectProvider, Subject, User } from './../../providers/api-services/subjects';
import { UserInfoProvider } from './../../providers/user-info';

@Component({
  selector: 'component-subject-student',
  templateUrl: 'subject-student.html',
})
export class SubjectStudentCompnent {

  public subject: Subject;
  public users: User[];
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private subjectProvider: SubjectProvider,
    private ngRadio: NgRadio,
    private userInfoProvider: UserInfoProvider,
  ) {
    this.subject = this.navParams.data;
  }

  public ngOnInit(): void {
    this.loadUsers();

    this.ngRadio.on('subject:student:*')
      .subscribe(() => this.loadUsers());
  }

  public get canModifySubject(): boolean {
    return this.userInfoProvider.isAdmin() || this.userInfoProvider.isTeacherOf(this.subject.teacherId);
  }

  public goToDetail(user: User): void {
    this.navCtrl.push(AddressPersonDetailPage, user);
  }

  public removeStudent($event: Event, user: User): void {
    $event.stopPropagation();
    this.subjectProvider.removeUser(this.subject.id, user.id)
      .subscribe(() => this.loadUsers());
  }

  private loadUsers(): void {
    if (this.subject.id) {
      this.users = [];
      this.loading = true;
      this.subjectProvider.getUsers(this.subject.id)
        .subscribe(data => {
          this.loading = false;
          this.users = data;
        });

    }
  }

}
