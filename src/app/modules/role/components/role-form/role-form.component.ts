import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { fuseAnimations } from '@fuse/animations/index';
import { Role } from '../../role.model';
import { Page } from '../../../page/page.model';
import { RolePage } from '../../../role-page/role-page.model';
import { RoleService } from '../../role.service';
import { PageService } from '../../../page/page.service';

@Component({
  selector: 'fuse-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})

export class RoleFormComponent implements OnInit {
  @Input() role: Role;
  roleForm: FormGroup;
  displayedPages: any = [];

  constructor (
    private _formBuilder: FormBuilder,
    private _roleService: RoleService,
    private _pageService: PageService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this._pageService.getPages(null).subscribe(res => {
      this.displayedPages = res.body;
    });
    this.roleForm = this.createRoleForm();
    this.patchPage();
  }

  createRoleForm(): FormGroup {
    return this._formBuilder.group({
      name        : [this.role.name, Validators.required],
      description : [this.role.description],
      role_pages  : this._formBuilder.array([ this.createPage(null) ]),
    });
  }

  createPage(rp): FormGroup {
    if (rp == null) {
      return this._formBuilder.group({
        id              : '',
        admin_role_id   : this.role.id,
        admin_page_id   : ['', Validators.required],
        is_create       : true,
        is_retrieve     : true,
        is_update       : true,
        is_delete       : true,
      });
    } else {
      return this._formBuilder.group({
        id              : rp.id,
        admin_role_id   : rp.admin_role_id,
        admin_page_id   : [rp.admin_page_id, Validators.required],
        is_create       : rp.is_create,
        is_retrieve     : rp.is_retrieve,
        is_update       : rp.is_update,
        is_delete       : rp.is_delete,
      });
    }
  }

  get pages() {
    return this.roleForm.get('role_pages') as FormArray;
  }

  patchPage() {
    const self = this;
    if (self.role.role_pages.length > 0) {
      self.role.role_pages.forEach(function (rp) {
        self.pages.push(self.createPage(rp));
      });
      self.pages.removeAt(0);
      console.log(self.pages);
    }
  }

  addPage() {
    this.pages.push(this.createPage(null));
  }

  removePage(pageIndex) {
    this.pages.removeAt(pageIndex);
  }

  save() {
    if (this.roleForm.invalid) {
      return;
    } else {
      this._roleService.save(this.role.id, this.roleForm.value).subscribe (
        res => {
          if (res) {
            this._router.navigate(['/roles']).then(() => {
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
