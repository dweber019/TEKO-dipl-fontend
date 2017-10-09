import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { NotificationPage, LessonDetailPage } from './../pages';
import { AgendaProvider, Agenda } from './../../providers/api-services/agenda';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  public agendas: Agenda[];
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private agendaProvider: AgendaProvider
  ) {
  }

  public ionViewDidEnter(): void {
    this.agendas = [];
    this.loading = true;
    this.agendaProvider.getAgenda()
      .subscribe(data => {
        this.loading = false;
        this.agendas = data;
      });
  }

  public openNotifications(): void {
    this.navCtrl.push(NotificationPage);
  }

  public goToLesson(agenda: Agenda): void {
    this.navCtrl.push(LessonDetailPage, { name: agenda.name, lesson: agenda.toLesson() });
  }

}
