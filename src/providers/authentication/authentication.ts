import { App, NavController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Injectable, Inject } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import * as queryString from 'query-string';
import { NativeStorage } from '@ionic-native/native-storage';

import { EnvVariables, IEnvVariables } from './../../modules/environment-variables/environment-variables.token';
import { MainPage, LoginPage } from './../../pages/pages';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(
    private app: App,
    @Inject(EnvVariables) private envVariables: IEnvVariables,
    private nativeStorage: NativeStorage,
    private iab: InAppBrowser,
    private platform: Platform
  ) {
    console.log('Hello AuthenticationProvider Provider');
  }

  public authenticate(): void {
    this.logoutPreActions();

    let target = '_self';
    if (this.platform.is('ios') || this.platform.is('android')) {
      target = '_blank';
    }

    const oauthBrowserInstance = this.iab.create(this.getAuthorizationUrl(), target, 'location=no');

    if (this.platform.is('ios') || this.platform.is('android')) {
      oauthBrowserInstance.on('loadstart').subscribe(event => {
        if (this.isRedirectUrl(event.url)) {
          this.saveToken(this.extractTokenFromHash(event.url));
          this.goToDashBoard();
          oauthBrowserInstance.close();
        }
      });
    }
  }

  public checkAuth(): boolean {
    if (this.isRedirectUrl()) {
      this.saveToken(this.extractTokenFromHash());
      this.goToDashBoard();
      return true;
    }
    return false;
  }

  public logoutPreActions(): void {
    this.removeToken();
  }

  public logout(): void {
    this.logoutPreActions();
    this.goToLogin();
  }

  public async isAuthenticated(): Promise<boolean> {
    const expired = await this.isTokenExpired();
    return !expired;
  }

  public isRedirectUrl(url?: string): boolean {
    return !!this.extractTokenFromHash(url);
  }

  public goToLogin(): void {
    setTimeout(() => this.navCtrl.setRoot(LoginPage), 300);
  }

  public goToDashBoard(): void {
    this.navCtrl.setRoot(MainPage);
  }

  public async isTokenExpired(): Promise<boolean> {
    const token = await this.getToken();
    if (token) {
      const expireDate = await this.getTokenExpireDate();
      return expireDate.isSameOrBefore(moment());
    } else {
      return true;
    }
  };

  public async getTokenExpireDate(): Promise<moment.Moment> {
    const token = await this.getDecodedToken();
    return moment.unix(<number>token.exp);
  };

  public async getDecodedToken(): Promise<any> {
    return jwtDecode(await this.getToken());
  };

  public getToken(): Promise<string> {
    return new Promise(resolve => {
      this.nativeStorage.getItem('token')
        .then(token => resolve(token))
        .catch(() => resolve(''));
    });
  }

  private extractTokenFromHash(url?: string): string {
    const parseUrl = url ? url.replace('http://localhost:8100/#', '') : window.location.hash.substring(1);
    const accessToken = queryString.parse(parseUrl).access_token;
    return accessToken;
  }

  private getAuthorizationUrl(): string {
    const origin = window.location.origin === 'file://' ? 'http://localhost:8100' : window.location.origin;

    const queryParams = queryString.stringify({
      response_type: 'token',
      client_id: this.envVariables.oauth.clientID,
      client_secret: this.envVariables.oauth.clientSecret,
      scope: this.envVariables.oauth.scope,
      audience: this.envVariables.oauth.audience,
      redirect_uri: origin
    });
    return `https://${this.envVariables.oauth.domain}/authorize?${queryParams}`;
  }

  private saveToken(token: string): void {
    console.log('token', token);
    this.nativeStorage.setItem('token', token);
  }

  private removeToken(): void {
    this.nativeStorage.remove('token');
  }

  private get navCtrl(): NavController {
    return this.app.getRootNav();
  }

}
