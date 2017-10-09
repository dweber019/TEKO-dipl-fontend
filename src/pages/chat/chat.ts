import { IChat } from './chat';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import * as _ from 'lodash';

import { ChatDetailPage } from './../pages';
import { UserProvider, User, Chat } from './../../providers/api-services/users';

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
          ids.forEach(id => {
            const chats = _.sortBy(data.filter(chat => chat.receiverId === id || chat.senderId === id), chat => chat.createdAt);
            const partnerSender = chats.find(chat => chat.senderId === id);
            const partnerReceiver = chats.find(chat => chat.receiverId === id)
            const partner = partnerSender && partnerSender.sender || partnerReceiver && partnerReceiver.receiver;
            const count = chats.filter(chat => chat.read === false && chat.receiverId === user.id).length;
            this.chats.push({
              partner,
              chats,
              count
            });
          });
          this.loading = false;
        });
    }).subscribe();
  }

}
