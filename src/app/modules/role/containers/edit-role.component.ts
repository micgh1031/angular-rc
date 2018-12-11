import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Role } from '../role.model';
import { RoleService } from '../role.service';

@Component({
  selector: 'fuse-edit-role',
  template: `
    <div class="page-layout simple p-24">
      <div class="mat-card mat-elevation-z4 p-20">
        <h3 class="mat-headline mb-20">Edit Role</h3>
        <fuse-role-form [role]="role" fxLayoutAlign="start" fxLayout.gt-md="row" fxLayout="column" *ngIf="dataLoaded" ></fuse-role-form>
      </div>
    </div>
  `,
})

export class EditRoleComponent implements OnInit {
  role: Role;
  dataLoaded = false;

  constructor (
    private _activatedRoute: ActivatedRoute,
    private _roleService: RoleService,
  ) {
    this._activatedRoute.params.subscribe(params => {
      this._roleService.editRole(params['id']).subscribe(res => {
        this.role = res.body;
        this.dataLoaded = true;
      });
    });
  }

  ngOnInit() {}
}
