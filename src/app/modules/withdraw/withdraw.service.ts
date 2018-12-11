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
import { Withdraw } from './withdraw.model';

@Injectable({
  providedIn: 'root'
})
export class WithdrawService {
  constructor(
    private http: HttpClient,
    @Inject(ApiService) public apiService: ApiService
  ){}

  getWithdraws(lastId = null, filter = '', sortFieldName = 'amount', sortOrder = 'asc', pageNum = 1, pageSize = 10): Observable<HttpResponse<any>> {
    let getParams = '';

    getParams = '?size_per_page=' + pageSize + '&page_number=' + pageNum + '&sort_field=' + sortFieldName + '&sort_order=' + sortOrder;
    if (filter !== '') {
      getParams += '&search_name=' + filter;
    }

    return this.http
      .get<any>(API_URL + 'withdraw' + getParams, this.apiService.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
      ).catch(error => {
        return Observable.throw(error.error);
      });
  }
}

export class WithdrawsDataSource implements DataSource<Withdraw> {

  private withdrawsSubject = new BehaviorSubject<Withdraw[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  connect(collectionViewer: CollectionViewer): Observable<Withdraw[]> {
    return this.withdrawsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.withdrawsSubject.complete();
    this.loadingSubject.complete();
  }

  loadWithdraws(withdraws) {
    this.withdrawsSubject.next(withdraws);
  }
}
