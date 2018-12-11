import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatPaginatorModule, MatTableModule, MatMenuModule, MatDatepickerModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatRippleModule, MatSortModule,  MatProgressSpinnerModule} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ListWithdrawsComponent } from './containers/list-withdraws/list-withdraws.component';
import { WithdrawRoutingModule } from './withdraw-routing.module';

import { ApiService } from '../../shared/services/api.service';
import { WithdrawService } from './withdraw.service';

export const COMPONENTS = [
  ListWithdrawsComponent,
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

    WithdrawRoutingModule
  ],
  declarations: COMPONENTS,
  providers: [WithdrawService, ApiService]
})
export class WithdrawModule { }
