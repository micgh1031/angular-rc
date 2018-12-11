import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Bank } from '../bank.model';
import { BankService } from '../bank.service';

@Component({
  selector: 'fuse-edit-bank',
  template: `
    <div class="page-layout simple p-24">
      <div class="mat-card mat-elevation-z4 p-20">
        <h3 class="mat-headline mb-20">Edit Bank</h3>
        <fuse-bank-form [bank]="bank" fxLayoutAlign="start" fxLayout.gt-md="row" fxLayout="column" *ngIf="dataLoaded" ></fuse-bank-form>
      </div>
    </div>
  `,
})

export class EditBankComponent implements OnInit {
  bank: Bank;
  dataLoaded = false;

  constructor (
    private _activatedRoute: ActivatedRoute,
    private _bankService: BankService,
  ) {
    this._activatedRoute.params.subscribe(params => {
      this._bankService.editBank(params['id']).subscribe(res => {
        this.bank = res.body;
        this.dataLoaded = true;
      });
    });
  }

  ngOnInit() {}
}
