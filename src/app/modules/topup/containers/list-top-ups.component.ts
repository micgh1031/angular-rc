import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { TopUpsDataSource, TopUpService } from '../topup.service';
import { tap } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs/index';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'fuse-list-top-ups',
  templateUrl: 'list-top-ups.component.html',
  styleUrls: ['list-top-ups.component.scss'],
})

export class ListTopUpsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['target_phone', 'user', 'currency', 'merchant', 'amount', 'fee', 'percent', 'fixed', 'discount', 'status', 'processed_at'];
  dataSource: TopUpsDataSource;
  total_items: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search_target_phone') search_target_phone: ElementRef;

  ngOnInit() {
    this.dataSource = new TopUpsDataSource();
    this.dataSource.loadingSubject.next(true);

    this._topupService.getTopUps().subscribe(res => {
      this.dataSource.loadTopUps(res.body.data);
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
    fromEvent(this.search_target_phone.nativeElement, 'keyup').pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(
        () => {
          this.dataSource = new TopUpsDataSource();
          this.dataSource.loadingSubject.next(true);
          this.paginator.pageIndex = 0;

          this._topupService.getTopUps(
            null,
            this.search_target_phone.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            1,
            this.paginator.pageSize
          ).subscribe(res => {
            this.dataSource.loadTopUps(res.body.data);
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
        this.dataSource = new TopUpsDataSource();
        this.dataSource.loadingSubject.next(true);

        this._topupService.getTopUps(
          null,
          this.search_target_phone.nativeElement.value,
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex + 1,
          this.paginator.pageSize
        ).subscribe(res => {
          this.dataSource.loadTopUps(res.body.data);
          this.dataSource.loadingSubject.next(false);
        });
      }
    )).subscribe();
  }

  constructor (
    private _topupService: TopUpService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {}
}
