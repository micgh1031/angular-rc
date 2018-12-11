import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule,  MatDividerModule, MatListModule, MatSlideToggleModule } from '@angular/material';

import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseNavigationModule } from '@fuse/components/index';

// import { NavbarModule } from 'app/main/components/navbar/navbar.module';

import { LayoutComponent } from 'app/main/containers/layout/layout.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { QuickPanelComponent } from './components/quick-panel/quick-panel.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const COMPONENTS = [
  LayoutComponent,
  ContentComponent,
  FooterComponent,
  ToolbarComponent,
  QuickPanelComponent,
  NavbarComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports     : [
    CommonModule,
    RouterModule,

    // Material moment date module
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,

    FuseSharedModule,
    FuseSidebarModule,
    FuseNavigationModule

    // ContentModule,
    // FooterModule,
    // NavbarModule,
    // QuickPanelModule,
    // ToolbarModule
  ],
  exports     : COMPONENTS
})


export class MainModule { }
