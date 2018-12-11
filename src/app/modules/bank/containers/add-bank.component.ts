import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations/index';
import { Bank } from '../bank.model';

@Component({
  selector: 'fuse-add-bank',
  template: `
  <div class="page-layout simple p-24">
    <div class="mat-card mat-elevation-z24 p-20">
      <h3 class="mat-headline mb-20">Add Bank</h3>
      <fuse-bank-form [bank]="bank" fxLayoutAlign="start" fxLayout.gt-md="row" fxLayout="column" ></fuse-bank-form>
    </div>
  </div>`,
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class AddBankComponent implements OnInit {
  bank: Bank;

  constructor() {
    this.bank = new Bank({});
  }

  ngOnInit() {}
}
