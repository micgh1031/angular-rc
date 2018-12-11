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
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(
    private http: HttpClient,
    @Inject(ApiService) public apiService: ApiService
  ){}

  getUsers(lastId = null, filter = '', sortFieldName = 'username', sortOrder = 'asc', pageNum = 1, pageSize = 10): Observable<HttpResponse<any>> {
    let getParams = '';

    getParams = '?size_per_page=' + pageSize + '&page_number=' + pageNum + '&sort_field=' + sortFieldName + '&sort_order=' + sortOrder;
    if (filter !== '') {
      getParams += '&search_name=' + filter;
    }

    return this.http
      .get<any>(API_URL + 'admin' + getParams, this.apiService.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
      ).catch(error => {
        return Observable.throw(error.error);
      });
  }

  editUser(id): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(API_URL + 'admin/' + id, this.apiService.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
      ).catch(error => {
        return Observable.throw(error.error);
      });
  }

  save(id, user): Observable<HttpResponse<any>> {
    if (id === '') {
      return this.http
        .post<any>(API_URL + 'admin', user, this.apiService.getHeaders())
        .pipe(
          tap(res => {
            return res;
          }),
        ).catch(error => {
          return Observable.throw(error.error);
        });
    } else {
      return this.http
        .put<any>(API_URL + 'admin/' + id, user, this.apiService.getHeaders())
        .pipe(
          tap(res => {
            return res;
          }),
        ).catch(error => {
          return Observable.throw(error.error);
        });
    }
  }

  deleteUser(id): Observable<HttpResponse<any>> {
    return this.http
      .delete<any>(API_URL + 'admin/' + id, this.apiService.getHeaders())
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

export class UsersDataSource implements DataSource<User> {

  private usersSubject = new BehaviorSubject<User[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
  }

  loadUsers(users) {
    this.usersSubject.next(users);
  }
}
