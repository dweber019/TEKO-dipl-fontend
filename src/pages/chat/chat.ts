import { IChat } from './chat';
import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  ActionSheetController,
  ModalController
} from 'ionic-angular';
import * as _ from 'lodash';

import { ChatDetailPage } from './../pages';
import { UserProvider, User, Chat } from './../../providers/api-services/users';
import { ChatModalPage } from './../chat-modal/chat-modal';

export interface IChat {
  partner: User,
  chats: Chat[],
  count: number,
}

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  public chats: IChat[] = [];
  public userId: number;
  public loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private userProvider: UserProvider,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
  ) {
  }

  public ionViewDidEnter(): void {
    this.loadChats();
  }

  public goToChat(chat: IChat): void {
    if (chat.count > 0) {
      this.userProvider.chatsRead(this.userId, chat.partner.id).subscribe();
    }

    this.navCtrl.push(ChatDetailPage, { userId: this.userId, chat});
  }

  private loadChats(): void {
    this.loading = true;
    this.chats = [];
    this.userProvider.getMe().map(user => {
      this.userId = user.id;
      this.userProvider.getChats(user.id)
        .subscribe(data => {
          const ids = _.uniq(_.flatten(_.map(data, item => [ item.senderId, item.receiverId ])).filter(item => item !== user.id));
          let chatTemp: IChat[] = [];
          ids.forEach(id => {
            const chats = _.sortBy(data.filter(chat => chat.receiverId === id || chat.senderId === id), chat => chat.createdAt);
            const partnerSender = chats.find(chat => chat.senderId === id);
            const partnerReceiver = chats.find(chat => chat.receiverId === id)
            const partner = partnerSender && partnerSender.sender || partnerReceiver && partnerReceiver.receiver;
            const count = chats.filter(chat => chat.read === false && chat.receiverId === user.id).length;
            chatTemp.push({
              partner,
              chats,
              count
            });
          });
          this.chats = chatTemp.sort((a, b) => {
            if (a.chats[0].createdAt > b.chats[0].createdAt) {
              return -1;
            }
            if (a.chats[0].createdAt < b.chats[0].createdAt) {
              return 1;
            }
            return 0;
          });
          this.loading = false;
        });
    }).subscribe();
  }

  public openActions(): void {
    let actionSheet = this.actionSheetController.create({
      buttons: [
        {
          text: 'New chat',
          handler: () => {
            this.presentModal();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => void 0
        }
      ]
    });
    actionSheet.present();
  }

  private presentModal(): void {
    let modal = this.modalController.create(ChatModalPage);
    modal.onDidDismiss(data => {
      this.loadChats();
    });
    modal.present();
  }

}
