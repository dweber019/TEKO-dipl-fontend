import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { NgRadio } from 'ng-radio';

import { TaskProvider, Task } from './../../providers/api-services/tasks';
import { TaskItemProvider, TaskItem } from './../../providers/api-services/taskitems';
import { TaskItemModalPage } from './../../pages/task-item-modal/task-item-modal';

@Component({
  selector: 'compnent-task-item',
  templateUrl: 'task-item.html',
})
export class TaskItemCompnent {

  public task: Task;
  public taskItems: TaskItem[];
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private taskProvider: TaskProvider,
    private ngRadio: NgRadio,
    private modalController: ModalController,
    private taskItemProvider: TaskItemProvider,
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

  public presentEditModal(taskItem: TaskItem): void {
    let modal = this.modalController.create(TaskItemModalPage, { taskItem });
    modal.onDidDismiss(() => this.loadTaskItems());
    modal.present();
  }

  public deleteTaskItem(taskItem: TaskItem): void {
    this.taskItemProvider.destory(taskItem.id)
      .subscribe(() => this.loadTaskItems());
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
