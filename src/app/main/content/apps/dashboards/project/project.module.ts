import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseProjectComponent } from './project.component';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { ProjectsDashboardService } from './projects.service';
import { FuseWidgetModule } from '../../../../../core/components/widget/widget.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { JobListComponentComponent } from './job-list-component/job-list-component.component';

//ML 
import { ComponentsModule } from '../../../components/components.module';
import { FusePriceTablesComponent } from 'app/main/content/components/price-tables/price-tables.component';
//MLML 
import {AuthGuard} from '../../../../../users/authguard/authguard.service';



const routes: Routes = [
    {
        path     : 'apps/dashboards/project',
        component: FuseProjectComponent,
        resolve  : {
            data: ProjectsDashboardService
        },
        canActivate: [AuthGuard]

    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        FuseWidgetModule,
        NgxChartsModule,
        //MLML -- to include prices table component
        ComponentsModule
    ],
    declarations: [
        FuseProjectComponent,
        JobListComponentComponent        


    ],
    providers   : [
        ProjectsDashboardService,
        //MLMLML
        AuthGuard

    ]
})
export class ProjectModule
{
}

