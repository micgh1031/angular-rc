import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';

import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { tap } from 'rxjs/operators';

import { API_URL } from '../../../environments/environment';
import { ApiService } from '../../shared/services/api.service';
import { Role } from './role.model';

@Injectable({
  providedIn: 'root'
})

export class RoleService {
  constructor(
    private http: HttpClient,
    @Inject(ApiService) public apiService: ApiService
  ){}

  getRoles(lastId = null, filter = '', sortFieldName = 'name', sortOrder = 'asc', pageNum = 1, pageSize = 10): Observable<HttpResponse<any>> {
    let getParams = '';

    getParams = '?size_per_page=' + pageSize + '&page_number=' + pageNum + '&sort_field=' + sortFieldName + '&sort_order=' + sortOrder;
    if (filter !== '') {
      getParams += '&search_name=' + filter;
    }

    return this.http
      .get<any>(API_URL + 'admin_role' + getParams, this.apiService.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
      ).catch(error => {
        return Observable.throw(error.error);
      });
  }

  editRole(id): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(API_URL + 'admin_role/' + id, this.apiService.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
      ).catch(error => {
        return Observable.throw(error.error);
      });
  }

  save(id, role): Observable<HttpResponse<any>> {
    if (id === '') {
      return this.http
        .post<any>(API_URL + 'admin_role', role, this.apiService.getHeaders())
        .pipe(
          tap(res => {
            return res;
          }),
        ).catch(error => {
          return Observable.throw(error.error);
        });
    } else {
      return this.http
        .put<any>(API_URL + 'admin_role/' + id, role, this.apiService.getHeaders())
        .pipe(
          tap(res => {
            return res;
          }),
        ).catch(error => {
          return Observable.throw(error.error);
        });
    }
  }

  deleteRole(id): Observable<HttpResponse<any>> {
    return this.http
      .delete<any>(API_URL + 'admin_role/' + id, this.apiService.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
      )
      .catch(error => {
        return Observable.throw(error.error);
      });
  }
}

export class RolesDataSource implements DataSource<Role> {

  private rolesSubject = new BehaviorSubject<Role[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  connect(collectionViewer: CollectionViewer): Observable<Role[]> {
    return this.rolesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.rolesSubject.complete();
    this.loadingSubject.complete();
  }

  loadRoles(roles) {
    this.rolesSubject.next(roles);
  }
}
