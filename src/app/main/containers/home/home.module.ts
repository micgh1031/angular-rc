import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { HomeComponent } from './home.component';


@NgModule({
    declarations: [
        HomeComponent
    ],
    imports     : [
        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        HomeComponent
    ]
})

export class HomeModule
{
}
