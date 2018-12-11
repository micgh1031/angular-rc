import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatPaginatorModule, MatTableModule, MatMenuModule, MatDatepickerModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatRippleModule, MatSortModule,  MatProgressSpinnerModule} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TopUpRoutingModule } from './topup-routing.module';
import { ListTopUpsComponent } from './containers/list-top-ups.component';

import { ApiService } from '../../shared/services/api.service';
import { TopUpService } from './topup.service';

export const COMPONENTS = [
  ListTopUpsComponent,
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

    TopUpRoutingModule
  ],
  declarations: COMPONENTS,
  providers: [TopUpService, ApiService]
})
export class TopUpModule { }
