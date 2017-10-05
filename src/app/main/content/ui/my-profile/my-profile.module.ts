import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { MyProfileComponent } from './my-profile.component';

const routes: Routes = [
    {
        path     : 'ui/my-profile',
        component: MyProfileComponent
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        MyProfileComponent
    ]
})
export class UIMyProfileModule 
{
}
