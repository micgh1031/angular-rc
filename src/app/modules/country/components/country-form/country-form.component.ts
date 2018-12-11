import {Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { fuseAnimations } from '@fuse/animations/index';
import { Country } from '../../country.model';
import { CountryService } from '../../country.service';

@Component({
  selector: 'fuse-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CountryFormComponent implements OnInit {
  // private _country;
  /*@Input()
  set country(country: Country) {
    this._country = (country) || new Country({});
  }*/

  @Input() country: Country;
  @ViewChild('image_input') image_input: ElementRef;

  countryForm: FormGroup;
  image_url: string;
  submitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _countryService: CountryService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}

  // get country(): Country { return this._country; }

  ngOnInit() {
    this.countryForm = this.createCountryForm();
  }

  createCountryForm(): FormGroup {
    return this._formBuilder.group({
      id      : [this.country.id],
      name    : [this.country.name, Validators.required],
      code2   : [this.country.code2, Validators.required],
      code3   : [this.country.code3, Validators.required],
      prefix   : [this.country.prefix, Validators.required],
      img_flag : [this.country.img_flag, Validators.required],
      img_flag_data : [''],
      is_frequently_used  : [this.country.is_frequently_used],
    });
  }

  get f() {
    return this.countryForm.controls;
  }

  save() {
    this.submitted = true;

    if (this.countryForm.invalid) {
      return;
    } else {
      this._countryService.save(this.country.id, this.countryForm.value).subscribe(
        res => {
          if (res) {
            this._router.navigate(['/countries']).then(() => {
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

  processFile(event) {
    const fileBrowser = this.image_input.nativeElement;

    if (fileBrowser.files && fileBrowser.files[0]) {
      const file = fileBrowser.files[0];
      const reader = new FileReader();

      reader.onload = (ev: any) => {
        this.countryForm.get('img_flag_data').setValue({
          filename: file.name,
          filetype: file.type,
          value: ev.target.result.split(',')[1]
        });

        this.countryForm.get('img_flag').setValue(file.name);

        // this.countryForm.patchValue({img_flag: reader.result});

        //  Image Preview
        this.image_url = ev.target.result;
      };

      reader.readAsDataURL(file);
    }
  }
}
