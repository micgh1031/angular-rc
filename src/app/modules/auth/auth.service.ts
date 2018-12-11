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
import {ApiService} from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any; log = (...args) => {};

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    @Inject(ApiService) public apiService: ApiService
  ){}

  signInUser(user: any): Observable<HttpResponse<any>> {
    return this.http
      .post<any>(API_URL + 'admin/login', user, { observe: 'response' })
      .pipe(
        tap((res: any) => {
          const user = res.body;
          // user.token = 'HWP-ADMIN-' + user.token;
          // this.log(`added hero w/ id=${res.data.id}`);
          this.apiService.setUser(user);
        }),
      ).catch(error => {
        return Observable.throw(error.error);
      });;
  }

}
