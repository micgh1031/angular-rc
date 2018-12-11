import {NgModule} from '@angular/core';

import {FuseCanAccessDirective} from '@fuse/directives/fuse-can-access/fuse-can-access.directive';
import {FuseIfOnDomDirective} from '@fuse/directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import {FuseInnerScrollDirective} from '@fuse/directives/fuse-inner-scroll/fuse-inner-scroll.directive';
import {FusePerfectScrollbarDirective} from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {
  FuseMatSidenavHelperDirective,
  FuseMatSidenavTogglerDirective
} from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.directive';

@NgModule({
  declarations: [
    FuseCanAccessDirective,
    FuseIfOnDomDirective,
    FuseInnerScrollDirective,
    FuseMatSidenavHelperDirective,
    FuseMatSidenavTogglerDirective,
    FusePerfectScrollbarDirective
  ],
  imports: [],
  exports: [
    FuseCanAccessDirective,
    FuseIfOnDomDirective,
    FuseInnerScrollDirective,
    FuseMatSidenavHelperDirective,
    FuseMatSidenavTogglerDirective,
    FusePerfectScrollbarDirective
  ]
})
export class FuseDirectivesModule {
}
