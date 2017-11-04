import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FuseJobComponent } from './job.component';
import { JobService } from './job.service';
import { FuseJobMainSidenavComponent } from './sidenavs/main/main-sidenav.component';
import { FuseJobListItemComponent } from './job-list/job-list-item/job-list-item.component';
import { FuseJobListComponent } from './job-list/job-list.component';
import { FuseJobDetailsComponent } from './job-details/job-details.component';

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
        FuseJobDetailsComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers   : [
        JobService
    ]
})
export class FuseJobModule
{
}
