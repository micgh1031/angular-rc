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
import { Currency } from './currency.model';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  constructor(
    private http: HttpClient,
    @Inject(ApiService) public apiService: ApiService
  ){}

  getCurrencies(lastId = null, filter = '', sortFieldName = 'name', sortOrder = 'asc', pageNum = 1, pageSize = 10): Observable<HttpResponse<any>> {
    let getParams = '';

    getParams = '?size_per_page=' + pageSize + '&page_number=' + pageNum + '&sort_field=' + sortFieldName + '&sort_order=' + sortOrder;
    if (lastId !== null && lastId !== '') {
      getParams += '&last_id=' + lastId;
    }
    if (filter !== '') {
      getParams += '&search_name=' + filter;
    }

    return this.http
      .get<any>(API_URL + 'currency' + getParams, this.apiService.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
      ).catch(error => {
        return Observable.throw(error.error);
      });
  }

  editCurrency(id): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(API_URL + 'currency/' + id, this.apiService.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
      ).catch(error => {
        return Observable.throw(error.error);
      });
  }

  save(id, currency): Observable<HttpResponse<any>> {
    if (id === '') {
      return this.http
        .post<any>(API_URL + 'currency', currency, this.apiService.getHeaders())
        .pipe(
          tap(res => {
            return res;
          }),
        ).catch(error => {
          return Observable.throw(error.error);
        });
    } else {
      return this.http
        .put<any>(API_URL + 'currency/' + id, currency, this.apiService.getHeaders())
        .pipe(
          tap(res => {
            return res;
          }),
        ).catch(error => {
          return Observable.throw(error.error);
        });
    }
  }

  deleteCurrency(id): Observable<HttpResponse<any>> {
    return this.http
      .delete<any>(API_URL + 'currency/' + id, this.apiService.getHeaders())
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

export class CurrenciesDataSource implements DataSource<Currency> {

  private currenciesSubject = new BehaviorSubject<Currency[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  connect(collectionViewer: CollectionViewer): Observable<Currency[]> {
    return this.currenciesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.currenciesSubject.complete();
    this.loadingSubject.complete();
  }

  loadCurrencies(currencies) {
    this.currenciesSubject.next(currencies);
  }
}
