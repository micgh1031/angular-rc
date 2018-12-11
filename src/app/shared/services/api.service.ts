import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs';
import 'rxjs/add/observable/throw';
import { catchError, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { API_URL } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private currentUser: any; log = (...args) => {};

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ){

  }

  setUser(user) {
    this.cookieService.set('user', JSON.stringify(user), null, '/');
    this.currentUser = user;
  }

  signOutUserLog(): Observable<HttpResponse<any>> {
    return this.http
      .post<any>(API_URL + 'admin/track_log', {type : 2}, this.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
      ).catch(error => {
        return Observable.throw(error.error);
      });
  }

  deleteUser() {
    this.cookieService.delete('user', '/');
    this.cookieService.deleteAll('/');

    this.currentUser = undefined;
  }

  getCurrentUser() {
    if (this.cookieService.get('user') === '' || !this.cookieService.check('user')) {
      return undefined;
    } else {
      return JSON.parse(this.cookieService.get('user'));
    }
  }

  getHeaders(): { headers: HttpHeaders, observe: 'response' } {
    const user = JSON.parse(this.cookieService.get('user'));

    return { headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'HWP-ADMIN-TOKEN': user.token,
      }), observe: 'response'};
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
