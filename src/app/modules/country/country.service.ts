import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { tap } from 'rxjs/operators';

import { HttpClient, HttpResponse } from '@angular/common/http';

import { CollectionViewer, DataSource } from '@angular/cdk/collections';

import { API_URL } from '../../../environments/environment';
import { ApiService } from '../../shared/services/api.service';
import { Country } from './country.model';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

export class CountryService {
  constructor(
    private http: HttpClient,
    @Inject(ApiService) public apiService: ApiService
  ){}

  getCountries(lastId = null, filter = '', sortFieldName = 'name', sortOrder = 'asc', pageNum = 1, pageSize = 10): Observable<HttpResponse<any>> {
    let getParams = '';

    getParams = '?size_per_page=' + pageSize + '&page_number=' + pageNum + '&sort_field=' + sortFieldName + '&sort_order=' + sortOrder;
    if (lastId !== null && lastId !== '') {
      getParams += '&last_id=' + lastId;
    }
    if (filter !== '') {
      getParams += '&search_name=' + filter;
    }

    return this.http
      .get<any>(API_URL + 'country' + getParams, this.apiService.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
      ).catch(error => {
        return Observable.throw(error.error);
      });
  }

  editCountry(id): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(API_URL + 'country/' + id, this.apiService.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
      ).catch(error => {
        return Observable.throw(error.error);
      });
  }

  save(id, country): Observable<HttpResponse<any>> {
    if (id === '') {
      return this.http
        .post<any>(API_URL + 'country', country, this.apiService.getHeaders())
        .pipe(
          tap(res => {
            // this.setUserToken(res.headers.get('access-token'), res.headers.get('client'));
            // this.store.dispatch({type: 'CREATE_ARTICLE', payload: payload});
            // this.store.dispatch({type: 'CREATE_ORGANIZATION', payload: res.body.data});
            return res;
          }),
        ).catch(error => {
          return Observable.throw(error.error);
        });
    } else {
      return this.http
        .put<any>(API_URL + 'country/' + id, country, this.apiService.getHeaders())
        .pipe(
          tap(res => {
            // this.setUserToken(res.headers.get('access-token'), res.headers.get('client'));
            // this.store.dispatch({type: 'CREATE_ARTICLE', payload: payload});
            // this.store.dispatch({type: 'CREATE_ORGANIZATION', payload: res.body.data});
            return res;
          }),
        ).catch(error => {
          return Observable.throw(error.error);
        });
    }
  }

  deleteCountry(id): Observable<HttpResponse<any>> {
    return this.http
      .delete<any>(API_URL + 'country/' + id, this.apiService.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
        // catchError(this.handleError<any>(`fetch status for game`))
      ).catch(error => {
        return Observable.throw(error.error);
      });
  }
}

export class CountriesDataSource implements DataSource<Country> {

  private countriesSubject = new BehaviorSubject<Country[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  connect(collectionViewer: CollectionViewer): Observable<Country[]> {
    return this.countriesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.countriesSubject.complete();
    this.loadingSubject.complete();
  }

  loadCountries(countries) {
    this.countriesSubject.next(countries);
  }
}
