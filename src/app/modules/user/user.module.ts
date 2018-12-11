import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatPaginatorModule, MatTableModule, MatCheckboxModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatMenuModule, MatSelectModule, MatDatepickerModule, MatRippleModule,
  MatSortModule, MatProgressSpinnerModule, MatDividerModule} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { ListUsersComponent } from './containers/list-users/list-users.component';
import { AddUserComponent } from './containers/add-user.component';
import { EditUserComponent } from './containers/edit-user.component';
import { UserFormComponent } from './components/user-form/user-form.component';

import { ApiService } from '../../shared/services/api.service';
import { UserService } from './user.service';

export const COMPONENTS = [
  ListUsersComponent,
  AddUserComponent,
  EditUserComponent,
  UserFormComponent,
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

    UserRoutingModule
  ],
  declarations: COMPONENTS,
  providers: [UserService, ApiService]
})
export class UserModule {}
