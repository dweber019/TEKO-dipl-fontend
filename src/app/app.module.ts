import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { EnvironmentsModule } from '../modules/environment-variables/environment-variables.module';
import { Items } from '../mocks/providers/items';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { AuthenticationProvider } from '../providers/authentication/authentication';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    EnvironmentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    User,
    SplashScreen,
    StatusBar,
    InAppBrowser,
    NativeStorage,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthenticationProvider
  ]
})
export class AppModule { }
