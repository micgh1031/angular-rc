import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from 'app/modules/auth/login/login.component';

import { AuthRoutingModule } from 'app/modules/auth/auth-routing.module';
import { AuthService } from './auth.service';
import { ApiService } from '../../shared/services/api.service';


export const COMPONENTS = [
  LoginComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,

    AuthRoutingModule,
    FuseSharedModule
  ],
  providers: [AuthService, ApiService]
  // exports: [LoginComponent]
})
export class AuthModule { }
