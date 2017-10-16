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
import {AuthGuardService} from '../../../../../core/users/auth-guard/auth-guard.service';
import { JobcardComponent } from './jobcard/jobcard.component';
import { JobsService } from 'app/main/content/apps/dashboards/project/jobs.service';



const routes: Routes = [
    {
        path     : 'apps/dashboards/project',
        component: FuseProjectComponent,
        resolve  : {
            data: ProjectsDashboardService
        },
        canActivate: [AuthGuardService]

    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        FuseWidgetModule,
        NgxChartsModule,
        //MLML -- to include prices table component TODO: maybe to remove
        ComponentsModule
    ],
    declarations: [
        FuseProjectComponent,
        JobListComponentComponent,
        JobcardComponent        


    ],
    providers   : [
        ProjectsDashboardService,
        //MLMLML
        AuthGuardService,
        JobsService

    ]
})
export class ProjectModule
{
}

