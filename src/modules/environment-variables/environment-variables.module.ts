import { NgModule } from '@angular/core';
import { EnvVariables } from './environment-variables.token';
import { devVariables } from './../../config/development';
import { prodVariables } from './../../config/production';

declare const process: any; // Typescript compiler will complain without this

export interface IEnv {
  apiEndpoint: string;
  environmentName: string;
  ionicEnvName: string;
  oauth: {
    clientID: string;
    clientSecret: string;
    domain: string;
    audience: string;
    scope: string;
  }
}

export function environmentFactory(): IEnv {
  return process.env.IONIC_ENV === 'prod' ? prodVariables : devVariables;
}

@NgModule({
  providers: [
    {
      provide: EnvVariables,
      // useFactory instead of useValue so we can easily add more logic as needed.
      useFactory: environmentFactory
    }
  ]
})
export class EnvironmentsModule {}
