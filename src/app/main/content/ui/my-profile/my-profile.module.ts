import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { MyProfileComponent } from './my-profile.component';
import { AuthGuardService } from 'app/core/users/auth-guard/auth-guard.service';
import { CurrentSkillsComponent } from './current-skills/current-skills.component';
import { CurrentSkillsItemComponent } from './current-skills/current-skills-item/current-skills-item.component';
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
        AgmCoreModule
        // AgmCoreModule.forRoot({
        //     apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        // })
    ],
    declarations: [
        MyProfileComponent,
        CurrentSkillsComponent,
        CurrentSkillsItemComponent
    ],
//    providers: [SkillsService]


})
export class UIMyProfileModule 
{
}
