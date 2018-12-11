import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { tap } from 'rxjs/operators';

import { HttpClient, HttpResponse } from '@angular/common/http';

import { API_URL } from '../../../environments/environment';
import { ApiService } from '../../shared/services/api.service';
import { Transaction } from './transaction.model';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
  constructor(
    private http: HttpClient,
    @Inject(ApiService) public apiService: ApiService
  ){}

  getTransactions(lastId = null, filter = '', sortFieldName = 'created_at', sortOrder = 'desc', pageNum = 1, pageSize = 10): Observable<HttpResponse<any>> {
    let getParams = '';

    getParams = '?size_per_page=' + pageSize + '&page_number=' + pageNum + '&sort_field=' + sortFieldName + '&sort_order=' + sortOrder;
    if (lastId !== null && lastId !== '') {
      getParams += '&last_id=' + lastId;
    }
    if (filter !== '') {
      getParams += '&search_name=' + filter;
    }

    return this.http
      .get<any>(API_URL + 'transaction' + getParams, this.apiService.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
      ).catch(error => {
        return Observable.throw(error.error);
      });
  }
}

export class TransactionsDataSource implements DataSource<Transaction> {

  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  connect(collectionViewer: CollectionViewer): Observable<Transaction[]> {
    return this.transactionsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.transactionsSubject.complete();
    this.loadingSubject.complete();
  }

  loadTransactions(transactions) {
    this.transactionsSubject.next(transactions);
  }
}
