import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCountriesComponent } from './containers/list-countries/list-countries.component';
import { AddCountryComponent } from './containers/add-country.component';
import { EditCountryComponent } from './containers/edit-country.component';

const routes: Routes = [
  { path: '', component: ListCountriesComponent },
  { path: 'new', component: AddCountryComponent },
  { path: 'edit/:id', component: EditCountryComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryRoutingModule {}
