import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { fuseAnimations } from '@fuse/animations/index';
import { Bank } from '../../bank.model';
import { Currency } from '../../../currency/currency.model';
import { BankService } from '../../bank.service';
import { CurrencyService } from '../../../currency/currency.service';

@Component({
  selector: 'fuse-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BankFormComponent implements OnInit {
  @Input() bank: Bank;
  currencies: Currency[] = [];
  bankForm: FormGroup;

  constructor (
    private _formBuilder: FormBuilder,
    private _bankService: BankService,
    private _currencyService: CurrencyService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {
    this._currencyService.getCurrencies().subscribe(res => {
      this.currencies = res.body.data;
    });
  }

  ngOnInit() {
    this.bankForm = this.createBankForm();
  }

  createBankForm(): FormGroup {
    return this._formBuilder.group({
      id      : [this.bank.id],
      name    : [this.bank.name, Validators.required],
      currency  : [this.bank.currency],
      currency_id : [this.bank.currency_id, Validators.required],
      is_online : [this.bank.is_online],
      is_active : [this.bank.is_active],
    });
  }

  get f() {
    return this.bankForm.controls;
  }

  save() {
    if (this.bankForm.invalid) {
      return;
    } else {
      this._bankService.save(this.bank.id, this.bankForm.value).subscribe (
        res => {
          if (res) {
            this._router.navigate(['/banks']).then(() => {
              this._toastrService.success('Saved successfully.');
            });
          } else {}
        },
        error => {
          // this.handleError(error);
        }
      );
    }
  }
}
