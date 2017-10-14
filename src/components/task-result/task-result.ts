import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgRadio } from 'ng-radio';

import { TaskProvider, Task } from './../../providers/api-services/tasks';
import { TaskItem } from './../../providers/api-services/taskitems';

@Component({
  selector: 'component-task-result',
  templateUrl: 'task-result.html',
})
export class TaskResultComponent {

  public task: Task;
  public taskItems: TaskItem[];
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private ngRadio: NgRadio,
    private taskProvider: TaskProvider,
  ) {
    this.task = this.navParams.data;
  }

  public ngOnInit(): void {
    if (this.task.id) {
      this.loadTaskItems();

      this.ngRadio.on('taskitem:add').subscribe(() => this.loadTaskItems());
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

}
