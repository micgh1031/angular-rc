import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCurrenciesComponent } from './containers/list-currencies/list-currencies.component';
import { AddCurrencyComponent } from './containers/add-currency.component';
import { EditCurrencyComponent } from './containers/edit-currency.component';

const routes: Routes = [
  { path: '', component: ListCurrenciesComponent },
  { path: 'new', component: AddCurrencyComponent },
  { path: 'edit/:id', component: EditCurrencyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrencyRoutingModule {}
