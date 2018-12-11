import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { tap } from 'rxjs/operators';

import { HttpClient, HttpResponse } from '@angular/common/http';

import { API_URL } from '../../../environments/environment';
import { ApiService } from '../../shared/services/api.service';
import { TopUp } from './topup.model';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

export class TopUpService {
  constructor(
    private http: HttpClient,
    @Inject(ApiService) public apiService: ApiService
  ){}

  getTopUps(lastId = null, filter = '', sortFieldName = 'target_phone', sortOrder = 'asc', pageNum = 1, pageSize = 10): Observable<HttpResponse<any>> {
    let getParams = '';

    getParams = '?size_per_page=' + pageSize + '&page_number=' + pageNum + '&sort_field=' + sortFieldName + '&sort_order=' + sortOrder;
    if (lastId !== null && lastId !== '') {
      getParams += '&last_id=' + lastId;
    }
    if (filter !== '') {
      getParams += '&search_target_phone=' + filter;
    }

    return this.http
      .get<any>(API_URL + 'bill/topup' + getParams, this.apiService.getHeaders())
      .pipe(
        tap(res => {
          return res;
        }),
      ).catch(error => {
        return Observable.throw(error.error);
      });
  }
}

export class TopUpsDataSource implements DataSource<TopUp> {

  private topupsSubject = new BehaviorSubject<TopUp[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  connect(collectionViewer: CollectionViewer): Observable<TopUp[]> {
    return this.topupsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.topupsSubject.complete();
    this.loadingSubject.complete();
  }

  loadTopUps(top_ups) {
    this.topupsSubject.next(top_ups);
  }
}
