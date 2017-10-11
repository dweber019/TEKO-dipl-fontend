import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatModalPage } from './chat-modal';

@NgModule({
  declarations: [
    ChatModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatModalPage),
  ],
})
export class ChatModalPageModule {}
