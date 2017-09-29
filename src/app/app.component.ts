import { Component, ViewChild, Inject } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';
import { EnvVariables } from '../modules/environment-variables/environment-variables.token';
import { AuthenticationProvider } from './../providers/authentication/authentication';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Dashboard', component: 'DashboardPage' },
    { title: 'Fächer', component: 'SubjectPage' },
    { title: 'Noten', component: 'GradePage' },
    { title: 'Chat', component: 'ChatPage' },
    { title: 'Adressbuch', component: 'AddressPage' },
    { title: 'Einstellungen', component: 'SettingsPage' },
  ]

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    @Inject(EnvVariables) public envVariables,
    private authenticationProvider: AuthenticationProvider
  ) {
    this.initTranslate();

    console.log('Env variables', envVariables);
  }

  public ngOnInit() {
    this.platform.ready().then((source) => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('ios') || this.platform.is('android')) {
        // Check if token is expiered
        this.authenticationProvider.isTokenExpired().then(shouldGoToLogin => {
          if (shouldGoToLogin) {
            this.authenticationProvider.goToLogin();
          }
        });
      } else {
        if (!this.authenticationProvider.checkAuth()) {
          // Check if token is expiered
          this.authenticationProvider.isTokenExpired().then(shouldGoToLogin => {
            if (shouldGoToLogin) {
              this.authenticationProvider.goToLogin();
            }
          });
        }
      }
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('de');

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
