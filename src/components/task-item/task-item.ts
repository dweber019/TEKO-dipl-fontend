import { Lesson } from './../../models/Lesson';
import { Component } from '@angular/core';
import { NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NgRadio } from 'ng-radio';
import { TranslateService } from '@ngx-translate/core';

import { TaskProvider, Task } from './../../providers/api-services/tasks';
import { TaskItemProvider, TaskItem } from './../../providers/api-services/taskitems';
import { TaskItemModalPage } from './../../pages/task-item-modal/task-item-modal';
import { UserInfoProvider } from './../../providers/user-info';
import { QuestionType } from './../../models/QuestionType';

@Component({
  selector: 'compnent-task-item',
  templateUrl: 'task-item.html',
})
export class TaskItemCompnent {

  private translation;
  private files: { [key:number]: File; } = {};

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
    private loadingController: LoadingController,
    private translateService: TranslateService,
    private toastController: ToastController,
  ) {
    this.task = this.navParams.data;

    this.translateService.get([
      'LOADING',
      'UPLOAD_SUCCESS',
      'FILE_TO_BIG',
      'FILE_WRONG_EXT',
      'SELECT_A_FILE',
    ]).subscribe(translation => this.translation = translation);
  }

  public ngOnInit(): void {
    if (this.task.id) {
      this.loadTaskItems();

      this.ngRadio.on('task:edit').subscribe(() => this.realoadTask());
      this.ngRadio.on('taskitem:add').subscribe(() => this.loadTaskItems());
    }
  }

  public fileChangeEvent($event, taskItem: TaskItem): void {
    const target = $event.target;
    if (target.files && target.files[0]) {
      if (target.files[0].size > 100000) {
        this.showFileToBig();
        return;
      }
      if (!this.validFileType(target.files[0])) {
        this.showFileWrongExt();
        return;
      }
      this.files[taskItem.id] = target.files[0];
    }
  }

  public upload(taskItem: TaskItem) {
    if (this.files[taskItem.id]) {

      let loader = this.loadingController.create({ content: this.translation.LOADING });
      loader.present();

      const formData = new FormData();
      formData.append("file", this.files[taskItem.id]);
      this.taskItemProvider.uploadFile(taskItem.id, formData)
        .subscribe(() => {
          loader.dismiss();
          let toast = this.toastController.create({
            message: this.translation.UPLOAD_SUCCESS,
            duration: 2000
          });
          toast.present();
          this.loadTaskItems();
        });
    } else {
      let toast = this.toastController.create({
        message: this.translation.SELECT_A_FILE,
        duration: 2000
      });
      toast.present();
    }
  }

  public get canEditTaskItem(): boolean {
    return this.userInfoProvider.isTeacherOrAdmin();
  }

  public changeTaskItem($event, taskItem: TaskItem): void {
    if (this.userInfoProvider.isStudent()) {
      this.taskItemProvider.work(taskItem.id, $event).subscribe();
    }
  }

  public getTaskItemResult(taskItem: TaskItem): string | boolean {
    let result = taskItem.users && taskItem.users[0] && taskItem.users[0].result;
    if (taskItem.questionType === QuestionType.FILE && result) {
      return (<string>result).split(';')[0];
    }
    return result;
  }

  public getTaskItemUrl(taskItem: TaskItem): string {
    return taskItem.users && taskItem.users[0] && taskItem.users[0].fileUrl;
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

  private showFileToBig(): void {
    let toast = this.toastController.create({
      message: this.translation.FILE_TO_BIG,
      duration: 2000
    });
    toast.present();
  }

  private showFileWrongExt(): void {
    let toast = this.toastController.create({
      message: this.translation.FILE_WRONG_EXT,
      duration: 2000
    });
    toast.present();
  }

  private validFileType(file): boolean {
    const validExtenstions = ['jpeg', 'jpg', 'bmp', 'png', 'pdf', 'doc', 'docx', 'ppt', 'pptx', 'txt', 'md'];
    const extenstionSplit = file.name.split('.');
    return validExtenstions.some(ext => ext === extenstionSplit[extenstionSplit.length - 1]);
  }

}
