import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';

import {FuseConfigService} from '@fuse/services/config.service';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';

import { CookieService } from 'ngx-cookie-service';
import {navigation} from 'app/navigation/navigation';
import { ApiService } from '../../../shared/services/api.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  userStatusOptions: any[];
  login_user_name: string;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private _translateService: TranslateService,
    private _apiService: ApiService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _cookieService: CookieService
  ) {
    // Set the defaults
    this.userStatusOptions = [
      {
        'title': 'Online',
        'icon': 'icon-checkbox-marked-circle',
        'color': '#4CAF50'
      },
      {
        'title': 'Away',
        'icon': 'icon-clock',
        'color': '#FFC107'
      },
      {
        'title': 'Do not Disturb',
        'icon': 'icon-minus-circle',
        'color': '#F44336'
      },
      {
        'title': 'Invisible',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#BDBDBD'
      },
      {
        'title': 'Offline',
        'icon': 'icon-checkbox-blank-circle-outline',
        'color': '#616161'
      }
    ];

    this.languages = [
      {
        id: 'en',
        title: 'English',
        flag: 'us'
      },
      {
        id: 'cn',
        title: '中文',
        flag: 'cn'
      }
    ];

    this.navigation = navigation;

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    if (this._cookieService.get('user') !== '') {
      this.login_user_name = this.capitalize(JSON.parse(this._cookieService.get('user'))['user']['username']);
    } else {
      this.login_user_name = '';
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((settings) => {
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });

    // Set the selected language from default languages
    this.selectedLanguage = _.find(this.languages, {'id': this._translateService.currentLang});
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  search(value): void {
    // Do your search here...
    console.log(value);
  }

  /**
   * Set the language
   */
  setLanguage(lang): void {
    // Set the selected language for the toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    this._translateService.use(lang.id);
  }

  logout() {
    this._apiService.signOutUserLog().subscribe (
      res => {
        if (res) {
          // Clear the cache containing user info
          window.location.reload();

          this._apiService.deleteUser();
          this._router.navigate(['/auth/login']).then(() => {
            this._toastrService.success('Signed out successfully.');
          });
        } else {}
      },
      error => {
        // this.handleError(error);
      }
    );

    /*this._router.navigate(['auth/login'], {queryParams: {'redirectURL': this._router.url}}).then(() => {
      this._toastrService.success('Signed out successfully.');
    });*/
  }

  capitalize(value): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
