import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Country } from '../country.model';
import { CountryService } from '../country.service';

@Component({
  selector: 'fuse-edit-country',
  template: `
    <div class="page-layout simple p-24">
      <div class="mat-card mat-elevation-z4 p-20">
        <h3 class="mat-headline mb-20">Edit Country</h3>
        <fuse-country-form [country]="country" fxLayoutAlign="start" fxLayout.gt-md="row" fxLayout="column" *ngIf="dataLoaded" ></fuse-country-form>
      </div>
    </div>
  `,
})
export class EditCountryComponent implements OnInit {

  country: Country;
  dataLoaded = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _countryService: CountryService
  ) {
    this._activatedRoute.params.subscribe(params => {
      this._countryService.editCountry(params['id']).subscribe(res => {
        this.country = res.body;
        this.dataLoaded = true;
      });
    });

  }

  ngOnInit() {
  }

}
