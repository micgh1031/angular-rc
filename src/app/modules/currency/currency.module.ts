import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatPaginatorModule, MatTableModule, MatCheckboxModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatMenuModule, MatDatepickerModule, MatRippleModule, MatSortModule,
  MatProgressSpinnerModule} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { CurrencyRoutingModule } from './currency-routing.module';
import { ListCurrenciesComponent } from './containers/list-currencies/list-currencies.component';
import { AddCurrencyComponent } from './containers/add-currency.component';
import { CurrencyFormComponent } from './components/currency-form/currency-form.component';
import { EditCurrencyComponent } from './containers/edit-currency.component';

import { ApiService } from '../../shared/services/api.service';
import { CurrencyService } from './currency.service';

export const COMPONENTS = [
  ListCurrenciesComponent,
  AddCurrencyComponent,
  EditCurrencyComponent,
  CurrencyFormComponent,
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

    CurrencyRoutingModule
  ],
  declarations: COMPONENTS,
  providers: [CurrencyService, ApiService]
})
export class CurrencyModule { }
