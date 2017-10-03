import { AuthenticationProvider } from './authentication/authentication';
import { Api } from './api/api';
import { AgendaProvider } from './api-services/agenda';
import { UserProvider } from './api-services/users';

export const prodviders = [
  AuthenticationProvider,
  Api,
  AgendaProvider,
  UserProvider,
];
