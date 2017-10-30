import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { ChatPage } from './chat';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    ChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatPage),
    ComponentsModule,
    TranslateModule.forChild(),
  ],
})
export class ChatPageModule {}
