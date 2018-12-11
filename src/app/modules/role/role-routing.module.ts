import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRolesComponent } from './containers/list-roles/list-roles.component';
import { AddRoleComponent } from './containers/add-role.component';
import { EditRoleComponent } from './containers/edit-role.component';

const routes: Routes = [
  { path: '', component: ListRolesComponent },
  { path: 'new', component: AddRoleComponent },
  { path: 'edit/:id', component: EditRoleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class RoleRoutingModule {}
