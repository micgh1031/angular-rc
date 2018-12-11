import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { UsersDataSource, UserService } from '../../user.service';

@Component({
  selector: 'fuse-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})

export class ListUsersComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['username', 'email', 'phone', 'language', 'admin_role', 'is_active', 'last_login_at', 'action'];
  dataSource: UsersDataSource;
  total_items: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search_name') search_name: ElementRef;

  ngOnInit() {
    this.dataSource = new UsersDataSource();
    this.dataSource.loadingSubject.next(true);

    this._userService.getUsers().subscribe(res => {
      this.dataSource.loadUsers(res.body.data);
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
          this.dataSource = new UsersDataSource();
          this.dataSource.loadingSubject.next(true);
          this.paginator.pageIndex = 0;

          this._userService.getUsers(
            null,
            this.search_name.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            1,
            this.paginator.pageSize
          ).subscribe(res => {
            this.dataSource.loadUsers(res.body.data);
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
        this.dataSource = new UsersDataSource();
        this.dataSource.loadingSubject.next(true);

        this._userService.getUsers(
          null,
          this.search_name.nativeElement.value,
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex + 1,
          this.paginator.pageSize
        ).subscribe(res => {
          this.dataSource.loadUsers(res.body.data);
          this.dataSource.loadingSubject.next(false);
        });
      }
    )).subscribe();
  }

  constructor (
    private _userService: UserService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {}

  deleteUser(user) {
    if (confirm('Are you sure to delete ' + user.name)) {
      this._userService
        .deleteUser(user.id)
        .subscribe(delete_res => {
          this._toastrService.success('Removed successfully.');

          this.dataSource = new UsersDataSource();
          this.dataSource.loadingSubject.next(true);
          this.paginator.pageIndex = 0;

          this._userService.getUsers(
            null,
            this.search_name.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            1,
            this.paginator.pageSize
          ).subscribe(res => {
            this.dataSource.loadUsers(res.body.data);
            this.total_items = res.body.total;
            this.dataSource.loadingSubject.next(false);
          });
        }, error => {
          console.log(error);
        });
    }
  }
}
