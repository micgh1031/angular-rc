import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTransfersComponent } from './containers/list-transfers.component';

const routes: Routes = [
  { path: '', component: ListTransfersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferRoutingModule {}
