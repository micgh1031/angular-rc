import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTopUpsComponent } from './containers/list-top-ups.component';

const routes: Routes = [
  { path: '', component: ListTopUpsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopUpRoutingModule {}
