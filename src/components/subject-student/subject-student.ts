import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddressPersonDetailPage } from './../../pages/pages';
import { SubjectProvider, Subject, User } from './../../providers/api-services/subjects';

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
  ) {
    this.subject = this.navParams.data;
  }

  public ngOnInit(): void {
    this.loadUsers();
  }

  public goToDetail(user: User): void {
    this.navCtrl.push(AddressPersonDetailPage, user);
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
