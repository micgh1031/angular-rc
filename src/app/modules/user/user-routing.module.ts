import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListUsersComponent } from './containers/list-users/list-users.component';
import { AddUserComponent } from './containers/add-user.component';
import { EditUserComponent } from './containers/edit-user.component';

const routes: Routes = [
  { path: '', component: ListUsersComponent },
  { path: 'new', component: AddUserComponent },
  { path: 'edit/:id', component: EditUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UserRoutingModule {}
