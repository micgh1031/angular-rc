import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/cn';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fuse-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  login_user_name: string;

  /**
   * Constructor
   */
  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private apiService: ApiService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, turkish);

    if (this.apiService.getCurrentUser() === undefined) {
      this.router.navigate(['/auth/login']);
    } else {
      this.login_user_name = this.capitalize(JSON.parse(this.cookieService.get('user'))['user']['username']);
    }
  }

  capitalize(value): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
