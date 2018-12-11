import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations/index';
import { Country } from '../country.model';

@Component({
  selector: 'fuse-add-country',
  template: `
    <div class="page-layout simple p-24">
      <div class="mat-card mat-elevation-z4 p-20">
        <h3 class="mat-headline mb-20">Add Country</h3>
        <fuse-country-form [country]="country" fxLayoutAlign="start" fxLayout.gt-md="row" fxLayout="column" ></fuse-country-form>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddCountryComponent implements OnInit {

  country: Country;
  constructor(
  ) {
    this.country = new Country({});
  }

  ngOnInit() {
  }

}



