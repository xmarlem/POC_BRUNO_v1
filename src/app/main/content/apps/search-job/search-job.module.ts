import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseEcommerceDashboardComponent } from './dashboard/dashboard.component';
import { EcommerceDashboardService } from './dashboard/dashboard.service';
import { SharedModule } from '../../../../core/modules/shared.module';
import { FuseWidgetModule } from '../../../../core/components/widget/widget.module';
import { FuseSearchJobJobsComponent } from './jobs/jobs.component';
import { SearchJobJobsService } from './jobs/jobs.service';
import { FuseSearchJobJobComponent } from './job/job.component';
import { SearchJobJobService } from './job/job.service';
import { FuseEcommerceOrdersComponent } from './orders/orders.component';
import { EcommerceOrdersService } from './orders/orders.service';
import { FuseEcommerceOrderComponent } from './order/order.component';
import { EcommerceOrderService } from './order/order.service';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
    {
        path     : 'dashboard',
        component: FuseEcommerceDashboardComponent,
        resolve  : {
            data: EcommerceDashboardService
        }
    },
    {
        path     : 'jobs',
        component: FuseSearchJobJobsComponent,
        resolve  : {
            data: SearchJobJobsService
        }
    },
    {
        path     : 'jobs/:id',
        component: FuseSearchJobJobComponent,
        resolve  : {
            data: SearchJobJobService
        }
    },
    {
        path     : 'jobs/:id/:handle',
        component: FuseSearchJobJobComponent,
        resolve  : {
            data: SearchJobJobService
        }
    },
    {
        path     : 'orders',
        component: FuseEcommerceOrdersComponent,
        resolve  : {
            data: EcommerceOrdersService
        }
    },
    {
        path     : 'orders/:id',
        component: FuseEcommerceOrderComponent,
        resolve  : {
            data: EcommerceOrderService
        }
    }

];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        FuseWidgetModule,
        NgxChartsModule,
        AgmCoreModule
    ],
    declarations: [
        FuseEcommerceDashboardComponent,
        FuseSearchJobJobsComponent,
        FuseSearchJobJobComponent,
        FuseEcommerceOrdersComponent,
        FuseEcommerceOrderComponent
    ],
    providers   : [
        EcommerceDashboardService,
        SearchJobJobsService,
        SearchJobJobService,
        EcommerceOrdersService,
        EcommerceOrderService
    ]
})
export class FuseSearchJobModule
{
}
