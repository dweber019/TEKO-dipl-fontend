import { Directive, HostBinding } from '@angular/core';

/**
 * Generated class for the WrapDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[wrap]' // Attribute selector
})
export class WrapDirective {

  @HostBinding('style.white-space')
  public whiteSpace = 'pre-wrap';

}
