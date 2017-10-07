import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { MyProfileComponent } from './my-profile.component';
//import { SkillComponent } from './skill/skill.component';


//import {SkillsService} from './skills.service';

const routes: Routes = [
    {
        path     : 'ui/my-profile',
        component: MyProfileComponent,
//        resolve: {
//            skills: SkillsService
//        }
    }
];


@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        MyProfileComponent
    ],
//    providers: [SkillsService]
})
export class UIMyProfileModule 
{
}
