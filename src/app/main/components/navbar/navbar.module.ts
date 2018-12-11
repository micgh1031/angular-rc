import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { NavbarComponent } from 'app/main/components/navbar/navbar.component';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports     : [
        FuseSharedModule,

    ],
    exports     : [
        NavbarComponent
    ]
})
export class NavbarModule
{
}
