import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatPaginatorModule, MatTableModule, MatMenuModule, MatDatepickerModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatRippleModule, MatSortModule,  MatProgressSpinnerModule} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TransactionRoutingModule } from './transaction-routing.module';
import { ListTransactionsComponent } from './containers/list-transactions.component';

import { ApiService } from '../../shared/services/api.service';
import { TransactionService } from './transaction.service';

export const COMPONENTS = [
  ListTransactionsComponent,
];

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatDatepickerModule,

    FuseSharedModule,

    TransactionRoutingModule
  ],
  declarations: COMPONENTS,
  providers: [TransactionService, ApiService]
})
export class TransactionModule { }
