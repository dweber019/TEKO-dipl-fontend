import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { EnvironmentsModule } from '../modules/environment-variables/environment-variables.module';
import { MyApp } from './app.component';
import { ApiInterceptor } from './../providers/api/api-interceptor';
import { prodviders } from './../providers/providers';
import { NativeStorageMock } from './../native-mocks';
import { ComponentsModule } from './../components/components.module';

import { SubjectModalPage } from './../pages/subject-modal/subject-modal';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(httpClient: HttpClient) {

  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    SubjectModalPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    EnvironmentsModule,
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SubjectModalPage
  ],
  providers: [
    ...prodviders,
    SplashScreen,
    StatusBar,
    InAppBrowser,
    { provide: NativeStorage, useClass: NativeStorageMock }, // Has to be changed in the feature
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ]
})
export class AppModule { }
