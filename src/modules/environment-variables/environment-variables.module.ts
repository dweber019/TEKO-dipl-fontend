import { NgModule } from '@angular/core';
import { EnvVariables } from './environment-variables.token';
import { devVariables } from './../../config/development';
import { prodVariables } from './../../config/production';

declare const process: any; // Typescript compiler will complain without this

export function environmentFactory() {
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