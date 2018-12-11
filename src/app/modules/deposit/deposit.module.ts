import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatPaginatorModule, MatTableModule, MatMenuModule, MatDatepickerModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatRippleModule, MatSortModule,  MatProgressSpinnerModule} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { DepositRoutingModule } from './deposit-routing.module';
import { ListDepositsComponent } from './containers/list-deposits.component';

import { ApiService } from '../../shared/services/api.service';
import { DepositService } from './deposit.service';

export const COMPONENTS = [
  ListDepositsComponent,
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

    DepositRoutingModule
  ],
  declarations: COMPONENTS,
  providers: [DepositService, ApiService]
})
export class DepositModule { }
