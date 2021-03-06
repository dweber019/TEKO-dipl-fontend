import { Component, ViewChild, Inject } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import * as moment from 'moment';
import { NativeStorage } from '@ionic-native/native-storage';

import {
  TutorialPage,
  DashboardPage,
  SubjectPage,
  GradePage,
  ChatPage,
  AddressPage,
  SettingsPage
} from '../pages/pages';
import { EnvVariables } from '../modules/environment-variables/environment-variables.token';
import { AuthenticationProvider } from './../providers/authentication/authentication';
import { UserInfoProvider } from './../providers/user-info';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  public rootPage;

  @ViewChild(Nav) public nav: Nav;

  public pages: any[] = [
    { title: 'MENU_DASHBOARD', component: DashboardPage },
    { title: 'MENU_SUBJECT', component: SubjectPage },
    { title: 'MENU_GRADE', component: GradePage },
    { title: 'MENU_CHAT', component: ChatPage },
    { title: 'MENU_ADDRESSBOOK', component: AddressPage },
    { title: 'MENU_SETTINGS', component: SettingsPage },
    { title: 'MENU_TUTORIAL', component: TutorialPage },
  ]

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    @Inject(EnvVariables) private envVariables,
    private authenticationProvider: AuthenticationProvider,
    private nativeStorage: NativeStorage,
    private userInfoProvider: UserInfoProvider,
  ) {
    this.initTranslate();
    this.initMoment();

    console.info(this.envVariables);
  }

  public ngOnInit(): void {
    this.platform.ready().then((source) => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#f8f8f8');
      this.splashScreen.hide();

      if (this.platform.is('ios') || this.platform.is('android')) {
        // Check if token is expiered
        this.authenticationProvider.isTokenExpired().then(shouldGoToLogin => {
          if (shouldGoToLogin) {
            this.authenticationProvider.goToLogin();
          } else {
            this.startApp();
          }
        });
      } else {
        if (!this.authenticationProvider.checkAuth()) {
          // Check if token is expiered
          this.authenticationProvider.isTokenExpired().then(shouldGoToLogin => {
            if (shouldGoToLogin) {
              this.authenticationProvider.goToLogin();
            } else {
              this.startApp();
            }
          });
        } else {
          this.startApp();
        }
      }
    });
  }

  public initTranslate(): void {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('de');

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  public openPage(page): void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (this.userInfoProvider.user) {
      this.nav.setRoot(page.component);
    } else {
      this.userInfoProvider.loadUser().subscribe(() => this.nav.setRoot(page.component));
    }
  }

  private initMoment(): void {
    moment.locale('de');
  }

  private loadUserInfo(): void {
    this.userInfoProvider.loadUser()
      .subscribe();
  }

  private startApp(): void {
    this.loadUserInfo();
    this.nativeStorage.getItem('hideTutorial').then(hide => {
      if (hide) {
        this.rootPage = DashboardPage;
      } else {
        this.rootPage = TutorialPage;
      }
    });
  }
}
