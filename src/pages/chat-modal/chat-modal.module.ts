import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { ChatModalPage } from './chat-modal';

@NgModule({
  declarations: [
    ChatModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatModalPage),
    TranslateModule.forChild(),
  ],
})
export class ChatModalPageModule {}
