import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations/index';
import { User } from '../user.model';

@Component({
  selector: 'fuse-add-user',
  template: `
  <div class="page-layout simple p-24">
    <div class="mat-card mat-elevation-z24 p-20">
      <h3 class="mat-headline mb-20">Add User</h3>
      <fuse-user-form [user]="user" fxLayoutAlign="start" fxLayout.gt-md="row" fxLayout="column" ></fuse-user-form>
    </div>
  </div>`,
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class AddUserComponent implements OnInit {
  user: User;

  constructor() {
    this.user = new User({});
  }

  ngOnInit() {}
}
