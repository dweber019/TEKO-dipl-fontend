import { App, NavController } from 'ionic-angular';
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
    private iab: InAppBrowser
  ) {
    console.log('Hello AuthenticationProvider Provider');
  }

  public authenticate(): void {
    this.logoutPreActions();

    const oauthBrowserInstance = this.iab.create(this.getAuthorizationUrl());
    oauthBrowserInstance.on('loadstart').subscribe(event => {
      console.log('event url: ', event.url);
    });
      // if (this.isRedirectUrl(event.url)) {
      //   this.logger.debug('authenticate: isRedirectURL', event.url);
      //   this.router.navigate('/login/&access_token=' + this.extractTokenFromHash(event.url));
      //   oauthBrowserInstance.close();
      // }
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
    this.navCtrl.setRoot(LoginPage);
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
    const parseUrl = url ? url : window.location.hash.substring(1);
    const accessToken = queryString.parse(parseUrl).access_token;
    return accessToken;
  }

  private getAuthorizationUrl(locationOrigin?: string): string {
    const queryParams = queryString.stringify({
      // We have to comment all standart oAuth params as the UAM is not oAuth compliant
      response_type: 'token',
      client_id: this.envVariables.oauth.clientID,
      client_secret: this.envVariables.oauth.clientSecret,
      scope: this.envVariables.oauth.scope,
      audience: this.envVariables.oauth.audience,
      redirect_uri: window.location.origin
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
