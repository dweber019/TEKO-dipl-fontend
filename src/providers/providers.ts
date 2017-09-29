import { AuthenticationProvider } from './authentication/authentication';
import { AgendaProvider } from './api-services/agenda';
import { Api } from './api/api';

export const prodviders = [
  AuthenticationProvider,
  Api,
  AgendaProvider
];
