import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatPaginatorModule, MatTableModule, MatCheckboxModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatMenuModule, MatSelectModule, MatDatepickerModule, MatRippleModule,
  MatSortModule, MatProgressSpinnerModule} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { BankRoutingModule } from './bank-routing.module';
import { ListBanksComponent } from './containers/list-banks/list-banks.component';
import { AddBankComponent } from './containers/add-bank.component';
import { EditBankComponent } from './containers/edit-bank.component';
import { BankFormComponent } from './components/bank-form/bank-form.component';

import { ApiService } from '../../shared/services/api.service';
import { BankService } from './bank.service';

export const COMPONENTS = [
  ListBanksComponent,
  AddBankComponent,
  EditBankComponent,
  BankFormComponent,
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
    MatSelectModule,
    MatMenuModule,
    MatRippleModule,
    MatDatepickerModule,

    FuseSharedModule,

    BankRoutingModule
  ],
  declarations: COMPONENTS,
  providers: [BankService, ApiService]
})
export class BankModule {}
