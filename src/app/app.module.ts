import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './route.reuse';

import { CookieService } from 'ngx-cookie-service';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';

import { MainModule } from './main/main.module';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './main/containers/home/home.component';
import { ApiService } from './shared/services/api.service';
import { AuthGuard } from './modules/auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      closeButton: true
    }),
    AppRoutingModule,

    TranslateModule.forRoot(),

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,

    // App modules
    MainModule,
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [AuthGuard, CookieService, ApiService,
    {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy
    }
  ],
})
export class AppModule {
}
