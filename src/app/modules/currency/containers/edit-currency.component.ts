import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Currency } from '../currency.model';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'fuse-edit-currency',
  template: `
    <div class="page-layout simple p-24">
      <div class="mat-card mat-elevation-z4 p-20">
        <h3 class="mat-headline mb-20">Edit Currency</h3>
        <fuse-currency-form [currency]="currency" fxLayoutAlign="start" fxLayout.gt-md="row" fxLayout="column" *ngIf="dataLoaded" ></fuse-currency-form>
      </div>
    </div>
  `,
})

export class EditCurrencyComponent implements OnInit {
  currency: Currency;
  dataLoaded = false;

  constructor (
    private _activatedRoute: ActivatedRoute,
    private _currencyService: CurrencyService
  ) {
    this._activatedRoute.params.subscribe(params => {
      this._currencyService.editCurrency(params['id']).subscribe(res => {
        this.currency = res.body;
        this.dataLoaded = true;
      });
    });
  }

  ngOnInit() {}
}
