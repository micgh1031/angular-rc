import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';

import { ApiService } from '../../app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private rolesMap = {
    Home: { is_retrieve: 1, is_create: 0, is_update: 0, is_delete: 0 }
  };

  constructor(
    private _apiService: ApiService
  ) {
  }

  public checkAuthorization(path: any): Observable<boolean> {
    const currentUser = this._apiService.getCurrentUser();
    if (currentUser !== undefined) {
      currentUser.roles.map(
        role => {
          return this.rolesMap[role.admin_page.name] = {
            is_retrieve : role.is_retrieve,
            is_create   : role.is_create,
            is_update   : role.is_update,
            is_delete   : role.is_delete
          };
        }
      );
      // console.log(this.rolesMap);

      // Check if the user is Super Admin
      if (currentUser.user.username === 'admin') {
        return of(true);
      } else {
        return of(this.doCheckAuthorization(path));
      }
    } else {
      return of(false);
    }
  }

  private doCheckAuthorization(path: any): boolean {
    const keys = this.parsePath(path);
    if (keys.length) {
      return Boolean(this.findEntry(this.rolesMap, keys));
    }
    return false;
  }

  private parsePath(path: any): string[] {
    if (typeof path === 'string') {
      return path.split('.');
    }
    if (Array.isArray(path)) {
      return path;
    }
    return [];
  }

  private findEntry(currentObject: any, keys: string[], index = 0) {
    const key = keys[index];
    if (currentObject[key] && index < keys.length - 1) {
      return this.findEntry(currentObject[key], keys, index + 1);
    } else if (currentObject[key] && index === keys.length - 1) {
      return currentObject[key];
    } else {
      return false;
    }
  }

}
