import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';

import { FuseLogin2Component } from './login-2.component';
import { GrowlModule, MessagesModule } from 'primeng/primeng';


const routes = [
    {
        path     : 'pages/auth/login-2',
        component: FuseLogin2Component
    }
];

@NgModule({
    declarations: [
        FuseLogin2Component
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        MessagesModule,
        GrowlModule
    ]
})

export class Login2Module
{

}
