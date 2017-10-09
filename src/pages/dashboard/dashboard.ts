import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { NotificationPage, LessonDetailPage } from './../pages';
import { AgendaProvider, Agenda } from './../../providers/api-services/agenda';
import { UserProvider } from './../../providers/api-services/users';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  public agendas: Agenda[];
  public loading: boolean = false;
  public notificationCount: number = 0;

  constructor(
    private navCtrl: NavController,
    private agendaProvider: AgendaProvider,
    private userProvider: UserProvider
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

    this.userProvider.getNotifications().subscribe(notifications => this.notificationCount = notifications.filter(item => item.read === false).length);
  }

  public openNotifications(): void {
    this.navCtrl.push(NotificationPage);
  }

  public goToLesson(agenda: Agenda): void {
    this.navCtrl.push(LessonDetailPage, { name: agenda.name, lesson: agenda.toLesson() });
  }

}
