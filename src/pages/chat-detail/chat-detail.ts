import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { UserProvider, Chat } from './../../providers/api-services/users';
import { ChatPage } from './../pages';
import { IChat } from './../chat/chat';

@IonicPage()
@Component({
  selector: 'page-chat-detail',
  templateUrl: 'chat-detail.html',
})
export class ChatDetailPage {

  @ViewChild(Content) public content: Content;

  private userId: number;
  private translation;

  public chat: IChat;
  public message: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private userProvider: UserProvider,
    private actionSheetController: ActionSheetController,
    private translateService: TranslateService,
  ) {
    this.userId = this.navParams.data.userId;
    this.chat = this.navParams.data.chat;

    this.translateService.get([
      'CANCEL',
      'DELETE_CHAT',
    ]).subscribe(translation => this.translation = translation);
  }

  public ionViewDidEnter(): void {
    if (!this.userId) {
      this.navCtrl.setRoot(ChatPage);
    } else {
      this.content.scrollToBottom();
    }
  }

  public send(): void {
    if (this.message.length > 0) {
      this.userProvider.createChat({
        senderId: this.userId,
        receiverId: this.chat.partner.id,
        message: this.message
      })
      .subscribe(chat => {
        this.chat.chats.push(chat);
        this.clearMessage();
        setTimeout(() => this.content.scrollToBottom());
      });
    }
  }

  public delete(): void {
    this.userProvider.destoryChat(this.userId, this.chat.partner.id)
      .subscribe(() => this.navCtrl.setRoot(ChatPage));
  }

  public openActions(): void {
    let actionSheet = this.actionSheetController.create({
      title: 'More Actions',
      buttons: [
        {
          text: this.translation.DELETE_CHAT,
          role: 'destructive',
          handler: () => {
            this.delete();
          }
        },
        {
          text: this.translation.CANCEL,
          role: 'cancel',
          handler: () => void 0
        }
      ]
    });
    actionSheet.present();
  }

  public isItMe(chat: Chat): boolean {
    return chat.senderId === this.userId;
  }

  private clearMessage(): void {
    this.message = '';
  }

}
