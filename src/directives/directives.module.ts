import { NgModule } from '@angular/core';

import { AutoresizeDirective } from './autoresize/autoresize';
import { WrapDirective } from './wrap/wrap';

@NgModule({
	declarations: [
    AutoresizeDirective,
    WrapDirective,
  ],
	imports: [],
	exports: [
    AutoresizeDirective,
    WrapDirective,
  ]
})
export class DirectivesModule {}
