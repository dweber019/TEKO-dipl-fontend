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

  get(endpoint: string, params?: any, options?) {
    return this.httpClient.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options) {
    return this.httpClient.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?) {
    return this.httpClient.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?) {
    return this.httpClient.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?) {
    return this.httpClient.put(this.url + '/' + endpoint, body, options);
  }
}
