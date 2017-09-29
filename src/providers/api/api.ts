import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EnvVariables, IEnvVariables } from './../../modules/environment-variables/environment-variables.token';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string;

  constructor(
    public httpClient: HttpClient,
    @Inject(EnvVariables) private envVariables: IEnvVariables,
  ) {
    this.url = this.envVariables.apiEndpoint;
  }

  get<T>(endpoint: string, params?: any, options?): Observable<T> {
    return this.httpClient.get(this.url + endpoint, options) as any;
  }

  post<T>(endpoint: string, body: any, options): Observable<T> {
    return this.httpClient.post(this.url + endpoint, body, options) as any;
  }

  put<T>(endpoint: string, body: any, options?): Observable<T> {
    return this.httpClient.put(this.url + endpoint, body, options) as any;
  }

  delete<T>(endpoint: string, options?): Observable<T> {
    return this.httpClient.delete(this.url + endpoint, options) as any;
  }

  patch<T>(endpoint: string, body: any, options?): Observable<T> {
    return this.httpClient.put(this.url + endpoint, body, options) as any;
  }
}
