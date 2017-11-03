import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { MyProfileComponent } from './my-profile.component';
import { AuthGuardService } from 'app/core/users/auth-guard/auth-guard.service';
//import { SkillComponent } from './skill/skill.component';


//import {SkillsService} from './skills.service';

const routes: Routes = [
    {
        path     : 'ui/my-profile',
        component: MyProfileComponent,
//        resolve: {
//            skills: SkillsService
//        }
        canActivate: [AuthGuardService]

    }
];


@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDqoMIE5UL8UXdrrTaN00kd-DbDdNB41jk'
        })
    ],
    declarations: [
        MyProfileComponent
    ],
//    providers: [SkillsService]


})
export class UIMyProfileModule 
{
}
