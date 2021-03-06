import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobService } from '../../job.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { fuseAnimations } from '../../../../../../core/animations';

@Component({
    selector   : 'fuse-job-main-sidenav',
    templateUrl: './main-sidenav.component.html',
    styleUrls  : ['./main-sidenav.component.scss'],
    animations : fuseAnimations
})
export class FuseJobMainSidenavComponent implements OnInit, OnDestroy
{
    folders: any[];
    filters: any[];
    tags: any[];
    accounts: object;
    selectedAccount: string;

    currentUser:any;

    onFiltersChanged: Subscription;
    onTagsChanged: Subscription;

    constructor(private jobService: JobService, private router: Router)
    {
        // Data
        this.accounts = {
            'creapond'    : 'daniel.eggenschwiler@credit-suisse.com',
            'withinpixels': 'daniel@gmx.ch'
        };

        this.selectedAccount = 'creapond';

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit()
    {
        this.onFiltersChanged =
            this.jobService.onFiltersChanged
                .subscribe(filters => {
                    this.filters = filters;
                });

        this.onTagsChanged =
            this.jobService.onTagsChanged
                .subscribe(tags => {
                    this.tags = tags;
                });
    }

    ngOnDestroy()
    {
        this.onFiltersChanged.unsubscribe();
        this.onTagsChanged.unsubscribe();
    }

    newJob()
    {
        this.router.navigate(['/apps/job/all']).then(() => {
            setTimeout(() => {
                this.jobService.onNewJobClicked.next('');
            });
        });
    }
}
