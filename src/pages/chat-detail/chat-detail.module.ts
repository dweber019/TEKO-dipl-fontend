import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { ChatDetailPage } from './chat-detail';

@NgModule({
  declarations: [
    ChatDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatDetailPage),
    TranslateModule.forChild(),
  ],
})
export class ChatDetailPageModule {}
