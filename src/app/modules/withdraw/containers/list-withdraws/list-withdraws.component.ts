import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { WithdrawsDataSource, WithdrawService } from '../../withdraw.service';

@Component({
  selector: 'fuse-list-withdraws',
  templateUrl: './list-withdraws.component.html',
  styleUrls: ['./list-withdraws.component.scss'],
})
export class ListWithdrawsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['merchant', 'user', 'bank', 'currency', 'amount', 'fee', 'percent', 'fixed', 'discount', 'status', 'is_online', 'created_at'];
  dataSource: WithdrawsDataSource;
  total_items: number;
  withdraws: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search_name') search_name: ElementRef;

  ngOnInit() {
    this.dataSource = new WithdrawsDataSource();
    this.dataSource.loadingSubject.next(true);

    this._withdrawService.getWithdraws(null).subscribe(res => {
      this.dataSource.loadWithdraws(res.body.data);
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
          this.dataSource = new WithdrawsDataSource();
          this.dataSource.loadingSubject.next(true);
          this.paginator.pageIndex = 0;

          this._withdrawService.getWithdraws(
            null,
            this.search_name.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            1,
            this.paginator.pageSize
          ).subscribe(res => {
            this.dataSource.loadWithdraws(res.body.data);
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
        this.dataSource = new WithdrawsDataSource();
        this.dataSource.loadingSubject.next(true);

        this._withdrawService.getWithdraws(
          null,
          this.search_name.nativeElement.value,
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex + 1,
          this.paginator.pageSize
        ).subscribe(res => {
          this.dataSource.loadWithdraws(res.body.data);
          this.dataSource.loadingSubject.next(false);
        });
      }
    )).subscribe();
  }

  constructor (
    private _withdrawService: WithdrawService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {}

}
