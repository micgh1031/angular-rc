import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'fuse-edit-user',
  template: `
    <div class="page-layout simple p-24">
      <div class="mat-card mat-elevation-z4 p-20">
        <h3 class="mat-headline mb-20">Edit User</h3>
        <fuse-user-form [user]="user" [editStatus]="true" fxLayoutAlign="start" fxLayout.gt-md="row" fxLayout="column" *ngIf="dataLoaded" ></fuse-user-form>
      </div>
    </div>
  `,
})

export class EditUserComponent implements OnInit {
  user: User;
  dataLoaded = false;

  constructor (
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
  ) {
    this._activatedRoute.params.subscribe(params => {
      this._userService.editUser(params['id']).subscribe(res => {
        this.user = res.body;
        this.dataLoaded = true;
      });
    });
  }

  ngOnInit() {}
}
