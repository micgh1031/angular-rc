import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs';
import 'rxjs/add/observable/throw';
import { catchError, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { API_URL } from '../../../environments/environment';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})

export class PageService {
  constructor(
    private http: HttpClient,
    @Inject(ApiService) public apiService: ApiService
  ){}

  getPages(lastId): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(API_URL + 'admin/pages', this.apiService.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
      ).catch(error => {
        return Observable.throw(error.error);
      });
  }
}
