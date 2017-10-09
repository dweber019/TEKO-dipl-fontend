import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { ChatPage, DashboardPage, SubjectDetailPage, TaskDetailPage, LessonDetailPage } from './../../pages/pages';
import { UserProvider, Notification } from './../../providers/api-services/users';
import { SubjectProvider } from './../../providers/api-services/subjects';
import { TaskProvider } from './../../providers/api-services/tasks';
import { LessonProvider } from './../../providers/api-services/lessons';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  private tabValue: string = 'read';
  public unreadNotifications: Notification[];
  public readNotifications: Notification[];
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private userProvider: UserProvider,
    private subjectProvider: SubjectProvider,
    private taskProvider: TaskProvider,
    private lessonProvider: LessonProvider,
  ) {
  }

  public ionViewDidEnter(): void {
    if (this.navCtrl.first().name !== DashboardPage) {
      this.navCtrl.setRoot(DashboardPage);
    } else {
      this.loadNotifications();
    }
  }

  public get tab(): string {
    return this.tabValue;
  }

  public set tab(tab: string) {
    this.loadNotifications();
    this.tabValue = tab;
  }

  public loadNotifications(): void {
    this.loading = true;
    this.unreadNotifications = this.readNotifications = [];
    this.userProvider.getMe().subscribe(user => this.userProvider.getNotifications(user.id)
      .subscribe(data => {
        this.unreadNotifications = data.filter(notification => notification.read === false);
        this.readNotifications = data.filter(notification => notification.read === true);
        this.loading = false;
      })
    );
  }

  public goToDetailAndClear(notification: Notification): void {

    this.goToDetail(notification);
  }

  public goToDetail(notification: Notification): void {
    switch (notification.getPageByRef()) {
      case ChatPage:
        this.navCtrl.setRoot(ChatPage);
        break;
      case LessonDetailPage:
        this.lessonProvider.get(notification.refId)
          .subscribe(lesson => this.navCtrl.push(LessonDetailPage, { lesson }))
        break;
      case SubjectDetailPage:
        this.subjectProvider.get(notification.refId)
          .subscribe(subject => this.navCtrl.push(SubjectDetailPage, subject));
        break;
      case TaskDetailPage:
        this.taskProvider.get(notification.refId)
          .subscribe(task => this.navCtrl.push(TaskDetailPage, task));
        break;
      default:
        this.navCtrl.setRoot(DashboardPage);
        break;
    }
  }

}
