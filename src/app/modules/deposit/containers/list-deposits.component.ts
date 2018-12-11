import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { DepositsDataSource, DepositService } from '../deposit.service';
import { tap } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs/index';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'fuse-list-deposits',
  templateUrl: 'list-deposits.component.html',
  styleUrls: ['list-deposits.component.scss'],
})

export class ListDepositsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['user', 'bank', 'currency', 'amount', 'fee', 'percent', 'fixed', 'discount', 'status', 'is_online', 'created_at'];
  dataSource: DepositsDataSource;
  total_items: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search_name') search_name: ElementRef;

  ngOnInit() {
    this.dataSource = new DepositsDataSource();
    this.dataSource.loadingSubject.next(true);

    this._depositService.getDeposits().subscribe(res => {
      this.dataSource.loadDeposits(res.body.data);
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
          this.dataSource = new DepositsDataSource();
          this.dataSource.loadingSubject.next(true);
          this.paginator.pageIndex = 0;

          this._depositService.getDeposits(
            null,
            this.search_name.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            1,
            this.paginator.pageSize
          ).subscribe(res => {
            this.dataSource.loadDeposits(res.body.data);
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
        this.dataSource = new DepositsDataSource();
        this.dataSource.loadingSubject.next(true);

        this._depositService.getDeposits(
          null,
          this.search_name.nativeElement.value,
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex + 1,
          this.paginator.pageSize
        ).subscribe(res => {
          this.dataSource.loadDeposits(res.body.data);
          this.dataSource.loadingSubject.next(false);
        });
      }
    )).subscribe();
  }

  constructor (
    private _depositService: DepositService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {}
}
