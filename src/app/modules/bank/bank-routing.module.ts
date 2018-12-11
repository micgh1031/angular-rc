import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListBanksComponent } from './containers/list-banks/list-banks.component';
import { AddBankComponent } from './containers/add-bank.component';
import { EditBankComponent } from './containers/edit-bank.component';

const routes: Routes = [
  { path: '', component: ListBanksComponent },
  { path: 'new', component: AddBankComponent },
  { path: 'edit/:id', component: EditBankComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BankRoutingModule {}
