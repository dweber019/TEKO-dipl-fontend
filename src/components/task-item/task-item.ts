import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgRadio } from 'ng-radio';

import { TaskProvider, Task, TaskItem } from './../../providers/api-services/tasks';

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
  ) {
    this.task = this.navParams.data;
  }

  public ngOnInit(): void {
    if (this.task.id) {
      this.loadTaskItems();

      this.ngRadio.on('task:edit').subscribe(() => this.realoadTask());
    }
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
