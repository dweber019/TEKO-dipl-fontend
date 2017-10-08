import { AuthenticationProvider } from './authentication/authentication';
import { Api } from './api/api';
import { AgendaProvider } from './api-services/agenda';
import { UserProvider } from './api-services/users';
import { GroupProvider } from './api-services/groups';
import { SubjectProvider } from './api-services/subjects';
import { ChatProvider } from './api-services/chats';
import { GradeProvider } from './api-services/grades';
import { LessonProvider } from './api-services/lessons';
import { NoteProvider } from './api-services/notes';
import { CommentProvider } from './api-services/comments';
import { TaskProvider } from './api-services/tasks';

export const prodviders = [
  AuthenticationProvider,
  Api,
  AgendaProvider,
  UserProvider,
  GroupProvider,
  SubjectProvider,
  ChatProvider,
  GradeProvider,
  LessonProvider,
  NoteProvider,
  CommentProvider,
  TaskProvider,
];
