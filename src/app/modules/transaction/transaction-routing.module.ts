import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTransactionsComponent } from './containers/list-transactions.component';

const routes: Routes = [
  { path: '', component: ListTransactionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {}
