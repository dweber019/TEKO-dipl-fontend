import { Component, Inject } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import * as Clipboard from 'clipboard';

import { AuthenticationProvider } from './../../providers/authentication/authentication';
import { UserProvider } from './../../providers/api-services/users';
import { EnvVariables, IEnvVariables } from '../../modules/environment-variables/environment-variables.token';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  private clipboard;

  public feedUrl: string;

  constructor(
    private userProvider: UserProvider,
    @Inject(EnvVariables) private envVariables: IEnvVariables,
    private toastController: ToastController,
    private authenticationProvider: AuthenticationProvider,
  ) {
  }

  public ionViewDidEnter(): void {
    this.clipboard = new Clipboard('#feed-btn', {
      text: () => this.feedUrl
    });
    this.clipboard.on('success', () => this.toastController.create({ message: 'Feed kopiert', duration: 3000, position: 'bottom' }).present());
    this.clipboard.on('error', () => this.toastController.create({ message: 'Feed konnte nicht kopiert werden', duration: 3000, position: 'bottom' }).present());

    this.userProvider.getMe()
      .subscribe(user => {
        this.feedUrl = this.envVariables.apiEndpoint + 'feed/' + user.calenderToken;
      });
  }

  public ionViewWillLeave(): void {
    this.clipboard.destroy();
  }

  public logout(): void {
    this.authenticationProvider.logout();
  }

}
