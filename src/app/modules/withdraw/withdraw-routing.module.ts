import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListWithdrawsComponent } from './containers/list-withdraws/list-withdraws.component';

const routes: Routes = [
  { path: '', component: ListWithdrawsComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawRoutingModule {}
