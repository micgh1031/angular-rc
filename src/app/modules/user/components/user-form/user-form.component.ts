import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { fuseAnimations } from '@fuse/animations/index';
import { User } from '../../user.model';
import { UserService } from '../../user.service';
import { RoleService } from '../../../role/role.service';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './_helpers/must-match.validator';

@Component({
  selector: 'fuse-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class UserFormComponent implements OnInit {
  @Input() user: User;
  @Input() editStatus = false;
  userForm: FormGroup;
  roles: any = [];
  pwHide = true;

  constructor (
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _roleService: RoleService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this._roleService.getRoles(null).subscribe(res => {
      this.roles = res.body.data;
    });
    this.userForm = this.createUserForm();
  }

  createUserForm(): FormGroup {
    console.log('Edit Status: ' + this.editStatus);
    return this._formBuilder.group({
      username              : [this.user.username, Validators.required],
      email                 : [this.user.email, [Validators.required, Validators.email]],
      phone                 : [this.user.phone, Validators.required],
      language              : [this.user.language, Validators.required],
      password              : ['', this.editStatus ? '' : [Validators.required, Validators.minLength(6)]],
      password_confirmation : ['', this.editStatus ? '' : Validators.required],
      admin_role_id         : [this.user.admin_role_id, Validators.required],
      is_active             : [Boolean(this.user.is_active), Validators.required],
    }, {
      validator: MustMatch('password', 'password_confirmation')
    });
  }

  get f() {
    return this.userForm.controls;
  }

  save() {
    if (this.userForm.invalid) {
      return;
    } else {
      this._userService.save(this.user.id, this.userForm.value).subscribe (
        res => {
          if (res) {
            this._router.navigate(['/users']).then(() => {
              this._toastrService.success('Saved successfully.');
            });
          } else {}
        },
        error => {
          // this.handleError(error);
        }
      );
    }
  }
}
