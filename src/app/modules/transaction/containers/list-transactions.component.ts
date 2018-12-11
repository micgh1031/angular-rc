import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import {Router} from '@angular/router';

import {ToastrService} from 'ngx-toastr';

import { TransactionsDataSource, TransactionService } from '../transaction.service';
import { tap } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs/index';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'fuse-list-transactions',
  templateUrl: 'list-transactions.component.html',
  styleUrls: ['list-transactions.component.scss'],
})

export class ListTransactionsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['user', 'merchant', 'type', 'relation_id', 'status', 'processed_at', 'created_at'];
  dataSource: TransactionsDataSource;
  total_items: number;
  type_group = [
    'UNKNOWN',
    'WITHDRAW',
    'DEPOSIT',
    'EXCHANGE',
    'TRANSFER',
    'QR_PAY',
    'TOP_UP',
    'WATER',
    'ELECTRICITY',
];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search_name') search_name: ElementRef;

  ngOnInit() {
    this.dataSource = new TransactionsDataSource();
    this.dataSource.loadingSubject.next(true);

    this._transactionService.getTransactions().subscribe(res => {
      this.dataSource.loadTransactions(res.body.data);
      this.total_items = res.body.total;
      this.dataSource.loadingSubject.next(false);
    }, error => {
      console.log(error);
      this._router.navigate(['/dashboard']).then(() => {
        this._toastrService.info(error.errors);
      });
    });
  }

  ngAfterViewInit() {
    // Server-side Search
    fromEvent(this.search_name.nativeElement, 'keyup').pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(
        () => {
          this.dataSource = new TransactionsDataSource();
          this.dataSource.loadingSubject.next(true);
          this.paginator.pageIndex = 0;

          this._transactionService.getTransactions(
            null,
            this.search_name.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            1,
            this.paginator.pageSize
          ).subscribe(res => {
            this.dataSource.loadTransactions(res.body.data);
            this.total_items = res.body.total;
            this.dataSource.loadingSubject.next(false);
          });
        }
      )).subscribe();

    // Reset the paginator after sorting.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // Server-side pagination and sort, load a new page.
    merge(this.sort.sortChange, this.paginator.page).pipe(tap(
      () => {
        this.dataSource = new TransactionsDataSource();
        this.dataSource.loadingSubject.next(true);

        this._transactionService.getTransactions(
          null,
          this.search_name.nativeElement.value,
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex + 1,
          this.paginator.pageSize
        ).subscribe(res => {
          this.dataSource.loadTransactions(res.body.data);
          this.dataSource.loadingSubject.next(false);
        });
      }
    )).subscribe();
  }

  constructor (
    private _transactionService: TransactionService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {}
}
