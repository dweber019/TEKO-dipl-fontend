import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { CommentModalPage } from './comment-modal';

@NgModule({
  declarations: [
    CommentModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentModalPage),
    TranslateModule.forChild(),
  ],
})
export class ChatModalPageModule {}
