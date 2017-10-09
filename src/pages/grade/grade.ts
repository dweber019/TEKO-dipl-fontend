import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';

import { SubjectDetailPage } from './../pages';
import { UserProvider, Grade, User } from './../../providers/api-services/users';

export interface IGrade {
  name: string;
  grade: string;
  teacher: User;
  color: string;
  grades: Grade[];
}

@IonicPage()
@Component({
  selector: 'page-grade',
  templateUrl: 'grade.html',
})
export class GradePage {

  public metaGrades: IGrade[];
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private userProvider: UserProvider
  ) {
  }

  public ionViewDidEnter(): void {
    this.metaGrades = [];
    this.loading = true;
    this.userProvider.getGrades()
      .subscribe(data => {
        const ids = _.uniq(_.map(data, item => item.id));
        ids.forEach(id => {
          const grades = data.filter(item => item.id === id);
          const grade = _.meanBy(grades, item => item.grade);
          const color = grade > 5 && 'secondary' || grade > 4 && 'primary' || 'danger';
          this.metaGrades.push({
            name: grades[0].name,
            grade: grade.toFixed(2),
            teacher: grades[0].teacher,
            color,
            grades,
          });
        });
        this.loading = false;
      });
  }

  public goToSubject(grade: Grade): void {
    this.navCtrl.push(SubjectDetailPage, grade.toSubject());
  }

}
