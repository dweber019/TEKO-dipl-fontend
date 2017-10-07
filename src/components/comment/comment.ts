import { Component, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { LessonProvider, Comment, Lesson } from './../../providers/api-services/lessons';

@Component({
  selector: 'component-comment',
  templateUrl: 'comment.html',
})
export class CommentComponent {

  @Input() entity: string;
  public loading: boolean = false;
  public lesson: Lesson;
  public comments: Comment[];
  public message: string;

  constructor(
    public navParams: NavParams,
    private lessonProvider: LessonProvider,
  ) {
    this.lesson = this.navParams.get('lesson');
  }

  public ngOnInit(): void {
    this.loadComments();
  }

  private loadComments(): void {
    this.loading = true;
    if (this.entity === 'lesson') {
      this.lessonProvider.getComments(this.lesson.id)
        .subscribe(data => {
          this.loading = false;
          this.comments = data;
        })
    }
  }

}
