import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatPaginatorModule, MatTableModule, MatMenuModule, MatDatepickerModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatRippleModule, MatSortModule,  MatProgressSpinnerModule} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TransferRoutingModule } from './transfer-routing.module';
import { ListTransfersComponent } from './containers/list-transfers.component';

import { ApiService } from '../../shared/services/api.service';
import { TransferService } from './transfer.service';

export const COMPONENTS = [
  ListTransfersComponent,
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

    TransferRoutingModule
  ],
  declarations: COMPONENTS,
  providers: [TransferService, ApiService]
})
export class TransferModule { }
