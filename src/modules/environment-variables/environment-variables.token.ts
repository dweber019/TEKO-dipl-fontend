import { OpaqueToken } from "@angular/core";

import { IEnv } from './environment-variables.module';

export let EnvVariables = new OpaqueToken("env.variables");

export type IEnvVariables = IEnv;
