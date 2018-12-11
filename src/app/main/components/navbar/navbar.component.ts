import { Component, ElementRef, Input, Renderer2, ViewEncapsulation, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector     : 'navbar',
    templateUrl  : './navbar.component.html',
    styleUrls    : ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, OnDestroy
{
  // Private
  _variant: string;

  fuseConfig: any;
  navigation: any;

  login_user_name: string;
  login_user_email: string;

  // Private
  private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
  private _unsubscribeAll: Subject<any>;
  /**
   * Constructor
   */
  constructor(
      private _elementRef: ElementRef,
      private _renderer: Renderer2,
      private _fuseConfigService: FuseConfigService,
      private _fuseNavigationService: FuseNavigationService,
      private _fuseSidebarService: FuseSidebarService,
      private _router: Router,
      private _cookieService: CookieService
  ) {
      // Set the private defaults
      this._variant = 'vertical-style-1';
      // Set the private defaults
      this._unsubscribeAll = new Subject();

      if (this._cookieService.get('user') !== '') {
        this.login_user_name = this.capitalize(JSON.parse(this._cookieService.get('user'))['user']['username']);
        this.login_user_email = JSON.parse(this._cookieService.get('user'))['user']['email'];
      } else {
        this.login_user_name = '';
        this.login_user_email = '';
      }

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Variant
   */
  get variant(): string
  {
      return this._variant;
  }

  @Input()
  set variant(value: string)
  {
      // Remove the old class name
      this._renderer.removeClass(this._elementRef.nativeElement, this.variant);

      // Store the variant value
      this._variant = value;

      // Add the new class name
      this._renderer.addClass(this._elementRef.nativeElement, value);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // Directive
  @ViewChild(FusePerfectScrollbarDirective)
  set directive(theDirective: FusePerfectScrollbarDirective)
  {
    if ( !theDirective )
    {
      return;
    }

    this._fusePerfectScrollbar = theDirective;

    // Update the scrollbar on collapsable item toggle
    this._fuseNavigationService.onItemCollapseToggled
      .pipe(
        delay(500),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this._fusePerfectScrollbar.update();
      });

    // Scroll to the active item position
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
          setTimeout(() => {
            const activeNavItem: any = document.querySelector('navbar .nav-link.active');

            if ( activeNavItem )
            {
              const activeItemOffsetTop       = activeNavItem.offsetTop,
                activeItemOffsetParentTop = activeNavItem.offsetParent.offsetTop,
                scrollDistance            = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3) - 168;

              this._fusePerfectScrollbar.scrollToTop(scrollDistance);
            }
          });
        }
      );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
          if ( this._fuseSidebarService.getSidebar('navbar') )
          {
            this._fuseSidebarService.getSidebar('navbar').close();
          }
        }
      );

    // Subscribe to the config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.fuseConfig = config;
      });

    // Get current navigation
    this._fuseNavigationService.onNavigationChanged
      .pipe(
        filter(value => value !== null),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.navigation = this._fuseNavigationService.getCurrentNavigation();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar opened status
   */
  toggleSidebarOpened(): void
  {
    this._fuseSidebarService.getSidebar('navbar').toggleOpen();
  }

  /**
   * Toggle sidebar folded status
   */
  toggleSidebarFolded(): void
  {
    this._fuseSidebarService.getSidebar('navbar').toggleFold();
  }

  /**
   * Capitalize String
   */
  capitalize(value): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
