import { RatingModule } from 'ngx-rating';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FuseJobComponent } from './job.component';
import { JobService } from './job.service';
import { FuseJobMainSidenavComponent } from './sidenavs/main/main-sidenav.component';
import { FuseJobListItemComponent } from './job-list/job-list-item/job-list-item.component';
import { FuseJobListComponent } from './job-list/job-list.component';
import { FuseJobDetailsComponent } from './job-details/job-details.component';
import { AgmCoreModule } from '@agm/core';
import { RecommendEmployeeComponent } from './recommend-employee/recommend-employee.component';
import { RatingComponent } from './rating/rating.component';

const routes: Routes = [
    {
        path     : 'all',
        component: FuseJobComponent,
        resolve  : {
            job: JobService
        }
    },
    {
        path     : 'all/:jobId',
        component: FuseJobComponent,
        resolve  : {
            job: JobService
        }
    },
    {
        path     : 'tag/:tagHandle',
        component: FuseJobComponent,
        resolve  : {
            job: JobService
        }
    },
    {
        path     : 'tag/:tagHandle/:jobId',
        component: FuseJobComponent,
        resolve  : {
            job: JobService
        }
    },
    {
        path     : 'filter/:filterHandle',
        component: FuseJobComponent,
        resolve  : {
            job: JobService
        }
    },
    {
        path     : 'filter/:filterHandle/:jobId',
        component: FuseJobComponent,
        resolve  : {
            job: JobService
        }
    },
    {
        path      : '**',
        redirectTo: 'all'
    }
];

@NgModule({
    declarations: [
        FuseJobComponent,
        FuseJobMainSidenavComponent,
        FuseJobListItemComponent,
        FuseJobListComponent,
        FuseJobDetailsComponent,
        RecommendEmployeeComponent,
        RatingComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        RatingModule,
    
        // AgmCoreModule.forRoot({   //MLMLML
        //     libraries: ["places"],
        //     language: "en", //TODO: QUANDO si fara' l'internazionalizzazione farlo diventare parametrico 
        //     apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        // })

    ],
    entryComponents: [
        RecommendEmployeeComponent
    ],
    
    providers   : [
        JobService
    ]
})
export class FuseJobModule
{
}
