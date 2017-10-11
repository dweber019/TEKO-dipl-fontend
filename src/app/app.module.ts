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
import { NgRadio } from 'ng-radio';

import { EnvironmentsModule } from '../modules/environment-variables/environment-variables.module';
import { MyApp } from './app.component';
import { ApiInterceptor } from './../providers/api/api-interceptor';
import { prodviders } from './../providers/providers';
import { NativeStorageMock } from './../native-mocks';
import { ComponentsModule } from './../components/components.module';
import { DirectivesModule } from './../directives/directives.module';
import { SubjectModalPage } from './../pages/subject-modal/subject-modal';
import { AddressPersonModalPage } from './../pages/address-person-modal/address-person-modal';
import { AddressGroupModalPage } from './../pages/address-group-modal/address-group-modal';
import { AddressGroupAddPersonModalPage } from './../pages/address-group-add-person-modal/address-group-add-person-modal';
import { SubjectAddPersonModalPage } from './../pages/subject-add-person-modal/subject-add-person-modal';
import { SubjectAddGradeModalPage } from './../pages/subject-add-grade-modal/subject-add-grade-modal';
import { ChatModalPage } from './../pages/chat-modal/chat-modal';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(httpClient: HttpClient) {

  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    SubjectModalPage,
    AddressPersonModalPage,
    AddressGroupModalPage,
    AddressGroupAddPersonModalPage,
    ChatModalPage,
    SubjectAddPersonModalPage,
    SubjectAddGradeModalPage,
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
    DirectivesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SubjectModalPage,
    AddressPersonModalPage,
    AddressGroupModalPage,
    AddressGroupAddPersonModalPage,
    ChatModalPage,
    SubjectAddPersonModalPage,
    SubjectAddGradeModalPage,
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
    NgRadio,
  ]
})
export class AppModule { }
