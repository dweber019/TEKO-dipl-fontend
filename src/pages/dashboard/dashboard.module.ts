import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardPage } from './dashboard';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    ComponentsModule,
    TranslateModule.forChild(),
  ],
})
export class DashboardPageModule {}
