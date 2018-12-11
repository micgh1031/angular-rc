import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations/index';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomReuseStrategy } from '../../../route.reuse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fuse-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  /**
   * Constructor
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    // , Validators.email
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  signIn() {
    this._authService.signInUser(this.loginForm.value).subscribe(
      res => {
        // if (typeof res === 'undefined') return false;
        if (res) {
          this._router.navigate(['/dashboard']).then(() => {
            this._toastrService.success('Signed in successfully.');
          });

          (this._router.routeReuseStrategy as CustomReuseStrategy).clearCache();
        } else {
        }
      },
      error => {
        this._toastrService.error('Login failed.');
      }
    );
  }

}
