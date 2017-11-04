import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '../job.model';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../job.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { fuseAnimations } from '../../../../../core/animations';

@Component({
    selector   : 'fuse-job-list',
    templateUrl: './job-list.component.html',
    styleUrls  : ['./job-list.component.scss'],
    animations : fuseAnimations
})
export class FuseJobListComponent implements OnInit, OnDestroy
{
    jobs: Job[];
    currentJob: Job;

    onJobsChanged: Subscription;
    onCurrentJobChanged: Subscription;

    constructor(
        private route: ActivatedRoute,
        private jobService: JobService,
        private location: Location
    )
    {
    }

    ngOnInit()
    {
        // Subscribe to update jobs on changes
        this.onJobsChanged =
            this.jobService.onJobsChanged
                .subscribe(jobs => {
                    this.jobs = jobs;
                });

        // Subscribe to update current job on changes
        this.onCurrentJobChanged =
            this.jobService.onCurrentJobChanged
                .subscribe(currentJob => {
                    if ( !currentJob )
                    {
                        // Set the current job id to null to deselect the current job
                        this.currentJob = null;

                        // Handle the location changes
                        const tagHandle    = this.route.snapshot.params.tagHandle,
                              filterHandle = this.route.snapshot.params.filterHandle;

                        if ( tagHandle )
                        {
                            this.location.go('apps/job/tag/' + tagHandle);
                        }
                        else if ( filterHandle )
                        {
                            this.location.go('apps/job/filter/' + filterHandle);
                        }
                        else
                        {
                            this.location.go('apps/job/all');
                        }
                    }
                    else
                    {
                        this.currentJob = currentJob;
                    }
                });
    }

    ngOnDestroy()
    {
        this.onJobsChanged.unsubscribe();
        this.onCurrentJobChanged.unsubscribe();
    }

    /**
     * Read job
     * @param jobId
     */
    readJob(jobId)
    {
        // Set current job
        this.jobService.setCurrentJob(jobId);
    }

    onDrop(ev)
    {
        this.jobService.updateJobs(this.jobs);
    }
}
