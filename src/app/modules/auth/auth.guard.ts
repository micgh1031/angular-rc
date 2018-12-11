import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router
} from '@angular/router';

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {
  private _router: Router;
  constructor(private _cookieService: CookieService, router: Router) {
    this._router = router;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this._cookieService.get('user') === '' || !this._cookieService.check('user')) {
      this._router.navigate(['auth/login'], {queryParams: {'redirectURL': state.url}});
      return false;
    } else {
      return true;
    }
  }
}
