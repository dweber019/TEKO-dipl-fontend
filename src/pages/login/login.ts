import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { AuthenticationProvider } from './../../providers/authentication/authentication';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private authenticationProvider: AuthenticationProvider
  ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.authenticationProvider.checkAuth();
  }

  public doLogin() {
    console.log('doLogin');
    this.authenticationProvider.authenticate();
  }
}
