import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { NotificationPage, SubjectDetailPage } from './../pages';
import { AgendaProvider, Agenda } from './../../providers/api-services/agenda';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  public goToDetail(agenda: Agenda): void {
    // go to lesson
    // this.navCtrl.push(SubjectDetailPage, );
  }

}
