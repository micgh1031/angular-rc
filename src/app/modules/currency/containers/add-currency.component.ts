import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations/index';
import { Currency } from '../currency.model';

@Component({
  selector: 'fuse-add-currency',
  template: `
  <div class="page-layout simple p-24">
    <div class="mat-card mat-elevation-z24 p-20">
      <h3 class="mat-headline mb-20">Add Currency</h3>
      <fuse-currency-form [currency]="currency" fxLayoutAlign="start" fxLayout.gt-md="row" fxLayout="column"></fuse-currency-form>
    </div>
  </div>`,
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class AddCurrencyComponent implements OnInit {
  currency: Currency;
  constructor() {
    this.currency = new Currency({});
  }

  ngOnInit() {}
}
