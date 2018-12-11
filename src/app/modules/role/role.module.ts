import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule, MatPaginatorModule, MatTableModule, MatCheckboxModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatMenuModule, MatSelectModule, MatDatepickerModule, MatRippleModule,
  MatSortModule, MatProgressSpinnerModule, MatDividerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { RoleRoutingModule } from './role-routing.module';
import { ListRolesComponent } from './containers/list-roles/list-roles.component';
import { AddRoleComponent } from './containers/add-role.component';
import { EditRoleComponent } from './containers/edit-role.component';
import { RoleFormComponent } from './components/role-form/role-form.component';

import { ApiService } from '../../shared/services/api.service';
import { RoleService } from './role.service';

export const COMPONENTS = [
  ListRolesComponent,
  AddRoleComponent,
  EditRoleComponent,
  RoleFormComponent,
];

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatRippleModule,
    MatDatepickerModule,
    MatDividerModule,

    FuseSharedModule,

    RoleRoutingModule
  ],
  declarations: COMPONENTS,
  providers: [RoleService, ApiService]
})

export class RoleModule { }
