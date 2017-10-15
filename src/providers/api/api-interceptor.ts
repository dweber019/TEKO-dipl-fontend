import { App, NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';

import { AuthenticationProvider } from './../authentication/authentication';
import { LoginPage } from './../../pages/pages';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private authenticationProvider: AuthenticationProvider,
    private app: App
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Observable from getToken promise
    const observable = Observable.fromPromise(this.authenticationProvider.getToken());

    return observable
      // switch the token with the next.hanlde method (avoid nested observables)
      .switchMap(token => {

        if (request.url.match(/taskItems\/\d+\/file/g)) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            }
          });
        } else {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
              Accept: 'applicaiton/json',
              'Content-Type': 'applicaiton/json',
            }
          });
        }

        return next.handle(request);
      })

      // Do someting with the response
      .do((event: any) => {
        // Manipulate response
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // redirect to the login route
            this.navCtrl.setRoot(LoginPage);
          }
        }
      });
  }

  private get navCtrl(): NavController {
    return this.app.getRootNav();
  }
}
