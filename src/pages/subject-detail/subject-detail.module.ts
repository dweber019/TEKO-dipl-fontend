import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { SubjectDetailPage } from './subject-detail';
import { SubjectLessonComponent } from './../../components/subject-lesson/subject-lesson';
import { SubjectGradeComponent } from './../../components/subject-grade/subject-grade';
import { SubjectStudentCompnent } from './../../components/subject-student/subject-student';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    SubjectDetailPage,
    SubjectLessonComponent,
    SubjectStudentCompnent,
    SubjectGradeComponent
  ],
  imports: [
    IonicPageModule.forChild(SubjectDetailPage),
    ComponentsModule,
    TranslateModule.forChild(),
  ],
})
export class SubjectDetailPageModule {}
