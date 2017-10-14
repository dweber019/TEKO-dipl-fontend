import { Component, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NgRadio } from 'ng-radio';

import { LessonProvider, Comment } from './../../providers/api-services/lessons';
import { TaskProvider } from './../../providers/api-services/tasks';

@Component({
  selector: 'component-comment',
  templateUrl: 'comment.html',
})
export class CommentComponent {

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
  ) { }

  public ngOnInit(): void {
    this.loadComments();

    this.ngRadio.on('lesson:comment:*').subscribe(() => this.loadComments());
    this.ngRadio.on('task:comment:*').subscribe(() => this.loadComments());
  }

  private loadComments(): void {
    this.loading = true;
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
