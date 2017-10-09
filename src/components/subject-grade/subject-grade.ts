import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';

import { AddressPersonDetailPage } from './../../pages/pages';
import { SubjectProvider, Subject, GradeUser } from './../../providers/api-services/subjects';

export interface IGradeUser {
  name: string;
  grade: string;
  color: string;
  grades: GradeUser[];
}

@Component({
  selector: 'component-subject-grade',
  templateUrl: 'subject-grade.html',
})
export class SubjectGradeComponent {

  public users: IGradeUser[];
  public subject: Subject;
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private subjectProvider: SubjectProvider
  ) {
    this.subject = this.navParams.data;
  }

  public ngOnInit(): void {
    this.loadGrades();
  }

  public loadGrades(): void {
    if (this.subject.id) {
      this.users = [];
      this.loading = true;
      this.subjectProvider.getGrades(this.subject.id)
        .subscribe(data => {
          const ids = _.uniq(_.map(data, item => item.id));
          ids.forEach(id => {
            const grades = data.filter(item => item.id === id);
            const grade = _.meanBy(grades, item => item.grade);
            const color = grade > 5 && 'secondary' || grade > 4 && 'primary' || 'danger';
            this.users.push({
              name: (grades[0].firstname + ' ' + grades[0].lastname).trim(),
              grade: grade.toFixed(2),
              color,
              grades,
            });
          });
          this.loading = false;
        });
    }
  }

  public goToUser(grade: IGradeUser): void {
    this.navCtrl.push(AddressPersonDetailPage, grade.grades[0].toUser());
  }

}
