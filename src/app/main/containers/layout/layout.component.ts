import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {FuseConfigService} from '@fuse/services/config.service';
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';

import {navigation} from 'app/navigation/navigation';
import {ApiService} from '../../../shared/services/api.service';

@Component({
  selector: 'fuse-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LayoutComponent implements OnInit, OnDestroy {
  fuseConfig: any;
  navigation: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param _fuseNavigationService
   * @param _apiService
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService,
    private _apiService: ApiService
  ) {
    // Set the defaults
    this.navigation = navigation;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.fuseConfig = config;
      });

    // Filter the default navigation by user role
    // this.filterNavigation();
  }

  /**
   * Filter navigation -- Disabled
   */
  filterNavigation() {
    const pageTitles = this._apiService.getCurrentUser().roles.map(
      role => role.admin_page.name
    );

    pageTitles.unshift('Home');
    this.navigation[0].children = this.navigation[0].children.filter(
      child => pageTitles.includes(child.title)
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
