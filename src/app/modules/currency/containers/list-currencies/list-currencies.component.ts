import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { CurrenciesDataSource, CurrencyService } from '../../currency.service';
import { tap } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs/index';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'fuse-list-currencies',
  templateUrl: './list-currencies.component.html',
  styleUrls: ['./list-currencies.component.scss'],
})

export class ListCurrenciesComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'symbol', 'is_active', 'action'];
  dataSource: CurrenciesDataSource;
  total_items: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search_name') search_name: ElementRef;

  ngOnInit() {
    this.dataSource = new CurrenciesDataSource();
    this.dataSource.loadingSubject.next(true);

    this._currencyService.getCurrencies().subscribe(res => {
      this.dataSource.loadCurrencies(res.body.data);
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
          this.dataSource = new CurrenciesDataSource();
          this.dataSource.loadingSubject.next(true);
          this.paginator.pageIndex = 0;

          this._currencyService.getCurrencies(
            null,
            this.search_name.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            1,
            this.paginator.pageSize
          ).subscribe(res => {
            this.dataSource.loadCurrencies(res.body.data);
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
        this.dataSource = new CurrenciesDataSource();
        this.dataSource.loadingSubject.next(true);

        this._currencyService.getCurrencies(
          null,
          this.search_name.nativeElement.value,
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex + 1,
          this.paginator.pageSize
        ).subscribe(res => {
          this.dataSource.loadCurrencies(res.body.data);
          this.dataSource.loadingSubject.next(false);
        });
      }
    )).subscribe();
  }

  constructor(
    private _currencyService: CurrencyService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {}

  deleteCurrency(currency) {
    if (confirm('Are you sure to delete ' + currency.name)) {
      this._currencyService
        .deleteCurrency(currency.id)
        .subscribe(delete_res => {
          this._toastrService.success('Removed successfully.');

          this.dataSource = new CurrenciesDataSource();
          this.dataSource.loadingSubject.next(true);
          this.paginator.pageIndex = 0;

          this._currencyService.getCurrencies(
            null,
            this.search_name.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            1,
            this.paginator.pageSize
          ).subscribe(res => {
            this.dataSource.loadCurrencies(res.body.data);
            this.total_items = res.body.total;
            this.dataSource.loadingSubject.next(false);
          });
        }, error => {
          console.log(error);
        });
    }
  }
}
