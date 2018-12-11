import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { fuseAnimations } from '@fuse/animations/index';
import { Currency } from '../../currency.model';
import { CurrencyService } from '../../currency.service';

@Component({
  selector: 'fuse-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CurrencyFormComponent implements OnInit {
  /*private _currency;
  @Input()
  set currency(currency: Currency) {
    this._currency = (currency) || new Currency({});
  }*/

  @Input() currency: Currency;
  currencyForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _currencyService: CurrencyService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.currencyForm = this.createCurrencyForm();
  }

  createCurrencyForm(): FormGroup
  {
    return this._formBuilder.group({
      id      : [this.currency.id],
      name    : [this.currency.name, Validators.required],
      symbol  : [this.currency.symbol, Validators.required],
      is_active : [this.currency.is_active],
    });
  }

  get f() {
    return this.currencyForm.controls;
  }

  save() {
    if (this.currencyForm.invalid) {
      return;
    } else {
      this._currencyService.save(this.currency.id, this.currencyForm.value).subscribe(
        res => {
          if (res) {
            this._router.navigate(['/currencies']).then(() => {
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
