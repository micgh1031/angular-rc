import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatPaginatorModule, MatTableModule, MatCheckboxModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatMenuModule, MatDatepickerModule, MatRippleModule, MatSortModule,
  MatProgressSpinnerModule} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ListCountriesComponent } from './containers/list-countries/list-countries.component';
import { CountryRoutingModule } from './country-routing.module';
import { AddCountryComponent } from './containers/add-country.component';
import { CountryFormComponent } from './components/country-form/country-form.component';
import { EditCountryComponent } from './containers/edit-country.component';

import { ApiService } from '../../shared/services/api.service';
import { CountryService } from './country.service';

export const COMPONENTS = [
  ListCountriesComponent,
  AddCountryComponent,
  EditCountryComponent,
  CountryFormComponent,
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
    MatMenuModule,
    MatRippleModule,
    MatDatepickerModule,

    FuseSharedModule,

    CountryRoutingModule
  ],
  declarations: COMPONENTS,
  providers: [CountryService, ApiService]
})
export class CountryModule { }
