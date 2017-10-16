import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NgRadio } from 'ng-radio';

import { TaskProvider, Task } from './../../providers/api-services/tasks';
import { TaskItem } from './../../providers/api-services/taskitems';
import { QuestionType } from './../../models/QuestionType';

@Component({
  selector: 'component-task-result',
  templateUrl: 'task-result.html',
})
export class TaskResultComponent {

  public task: Task;
  public taskItems: TaskItem[];
  public loading: boolean = false;

  constructor(
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

  public fileSplitName(name: string): string {
    if (name) {
      return (<string>name).split(';')[0];
    }
    return name;
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
