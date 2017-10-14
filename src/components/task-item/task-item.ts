import { Component } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';
import { NgRadio } from 'ng-radio';

import { TaskProvider, Task } from './../../providers/api-services/tasks';
import { TaskItemProvider, TaskItem } from './../../providers/api-services/taskitems';
import { TaskItemModalPage } from './../../pages/task-item-modal/task-item-modal';
import { UserInfoProvider } from './../../providers/user-info';

@Component({
  selector: 'compnent-task-item',
  templateUrl: 'task-item.html',
})
export class TaskItemCompnent {

  public task: Task;
  public taskItems: any[];
  public loading: boolean = false;

  constructor(
    private navParams: NavParams,
    private taskProvider: TaskProvider,
    private ngRadio: NgRadio,
    private modalController: ModalController,
    private taskItemProvider: TaskItemProvider,
    private userInfoProvider: UserInfoProvider,
  ) {
    this.task = this.navParams.data;
  }

  public ngOnInit(): void {
    if (this.task.id) {
      this.loadTaskItems();

      this.ngRadio.on('task:edit').subscribe(() => this.realoadTask());
      this.ngRadio.on('taskitem:add').subscribe(() => this.loadTaskItems());
    }
  }

  public get canEditTaskItem(): boolean {
    return this.userInfoProvider.isTeacherOrAdmin();
  }

  public changeTaskItem($event, taskItem: TaskItem): void {
    console.log($event, taskItem, this.userInfoProvider.isStudent());
    if (this.userInfoProvider.isStudent()) {
      this.taskItemProvider.work(taskItem.id, $event).subscribe();
    }
  }

  public getTaskItemResult(taskItem: TaskItem): string | boolean {
    return taskItem.users && taskItem.users[0] && taskItem.users[0].result;
  }

  public presentEditModal(taskItem: TaskItem): void {
    let modal = this.modalController.create(TaskItemModalPage, { taskItem });
    modal.onDidDismiss(() => this.loadTaskItems());
    modal.present();
  }

  public deleteTaskItem(taskItem: TaskItem): void {
    this.taskItemProvider.destory(taskItem.id)
      .subscribe(() => this.loadTaskItems());
  }

  public getSelectOptions(taskItem: TaskItem): string[] {
    return taskItem.question.split(',');
  }

  private loadTaskItems(): void {
    this.loading = true;
    this.taskItems = [];
    this.taskProvider.getTaskItems(this.task.id)
      .subscribe(data => {
        this.loading = false;
        this.taskItems = data;
      })
  }

  private realoadTask(): void {
    this.taskProvider.get(this.task.id)
      .subscribe(task => this.task = task);
  }

}
