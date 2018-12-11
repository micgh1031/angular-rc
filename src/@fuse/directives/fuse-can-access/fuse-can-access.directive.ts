import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { PermissionsService } from '../../services/permissions.service';

@Directive({
  selector: '[fuseAppCanAccess]'
})
export class FuseCanAccessDirective implements OnInit, OnDestroy {

  @Input() set fuseAppCanAccess(value: string | string[]) {
    this.applyPermission(value);
  }
  permissions: Subscription;

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private _permissionService: PermissionsService
  ){
  }

  ngOnInit(): void {
  }

  private applyPermission(value: string | string[]): void {
    this.permissions = this._permissionService.checkAuthorization(value)
      .subscribe(authorized => {
        // console.log('value', value);
        // console.log('authorized', authorized);
        if (authorized) {
          this._viewContainer.createEmbeddedView(this._templateRef);
        } else {
          this._viewContainer.clear();
        }
      });
  }

  ngOnDestroy(): void {
    this.permissions.unsubscribe();
  }

}
