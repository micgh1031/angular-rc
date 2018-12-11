import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDepositsComponent } from './containers/list-deposits.component';

const routes: Routes = [
  { path: '', component: ListDepositsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositRoutingModule {}
