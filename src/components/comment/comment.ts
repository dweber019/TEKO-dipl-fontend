import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';
import { NgRadio } from 'ng-radio';

import { LessonProvider, Comment, Lesson } from './../../providers/api-services/lessons';
import { TaskProvider, Task } from './../../providers/api-services/tasks';
import { UserInfoProvider } from './../../providers/user-info';
import { CommentProvider } from './../../providers/api-services/comments';
import { CommentModalPage } from './../../pages/comment-modal/comment-modal';

@Component({
  selector: 'component-comment',
  templateUrl: 'comment.html',
})
export class CommentComponent {

  private lesson: Lesson;
  private task: Task;

  @Input() entity: string;
  public loading: boolean = false;
  public id: number;
  public comments: Comment[];
  public message: string;

  constructor(
    private navParams: NavParams,
    private lessonProvider: LessonProvider,
    private taskProvider: TaskProvider,
    private ngRadio: NgRadio,
    private userInfoProvider: UserInfoProvider,
    private commentProvider: CommentProvider,
    private modalController: ModalController,
  ) {
    this.lesson = this.navParams.get('lesson');
    this.task = this.navParams.get('task');
  }

  public ngOnInit(): void {
    this.loadComments();

    this.ngRadio.on('lesson:comment:*').subscribe(() => this.loadComments());
    this.ngRadio.on('task:comment:*').subscribe(() => this.loadComments());
  }

  public canDelete(comment: Comment): boolean {
    return this.userInfoProvider.isAdmin() || comment.user.id === this.userInfoProvider.getUser().id;
  }

  public removeComment($event: Event, comment: Comment): void {
    $event.stopPropagation();
    this.commentProvider.destory(comment.id).subscribe(() => this.loadComments());
  }

  public editComment($event: Event, comment: Comment): void {
    $event.stopPropagation();
    let modal = this.modalController.create(CommentModalPage, { lesson: this.lesson, task: this.task, comment });
    modal.onDidDismiss(() => this.ngRadio.cast('lesson:comment:add'));
    modal.present();
  }

  private loadComments(): void {
    this.loading = true;
    this.comments = [];
    if (this.entity === 'lesson') {
      this.id = this.navParams.get('lesson').id;
      this.lessonProvider.getComments(this.id)
        .subscribe(data => {
          this.loading = false;
          this.comments = data;
        })
    } else {
      this.id = this.navParams.data.id;
      this.taskProvider.getComments(this.id)
        .subscribe(data => {
          this.loading = false;
          this.comments = data;
        })
    }
  }

}
