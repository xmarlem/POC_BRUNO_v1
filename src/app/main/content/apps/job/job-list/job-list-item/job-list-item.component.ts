import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Job } from '../../job.model';
import { JobService } from '../../job.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector     : 'fuse-job-list-item',
    templateUrl  : './job-list-item.component.html',
    styleUrls    : ['./job-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseJobListItemComponent implements OnInit, OnDestroy
{
    @Input() job: Job;
    tags: any[];
    @HostBinding('class.selected') selected: boolean;
    @HostBinding('class.completed') completed: boolean;
    @HostBinding('class.move-disabled') moveDisabled: boolean;

    onSelectedJobsChanged: Subscription;
    onTagsChanged: Subscription;

    constructor(
        private jobService: JobService,
        private route: ActivatedRoute
    )
    {
        // Disable move if path is not /all
        if ( route.snapshot.url[0].path !== 'all' )
        {
            this.moveDisabled = true;
        }
    }

    ngOnInit()
    {
        // Set the initial values
        this.job = new Job(this.job);
        this.completed = this.job.completed;

        // Subscribe to update on selected job change
        this.onSelectedJobsChanged =
            this.jobService.onSelectedJobsChanged
                .subscribe(selectedJobs => {
                    this.selected = false;

                    if ( selectedJobs.length > 0 )
                    {
                        for ( const job of selectedJobs )
                        {
                            if ( job.id === this.job.id )
                            {
                                this.selected = true;
                                break;
                            }
                        }
                    }
                });

        // Subscribe to update on tag change
        this.onTagsChanged =
            this.jobService.onTagsChanged
                .subscribe(tags => {
                    this.tags = tags;
                });
    }

    ngOnDestroy()
    {
        this.onSelectedJobsChanged.unsubscribe();
    }

    onSelectedChange()
    {
        this.jobService.toggleSelectedJob(this.job.id);
    }

    /**
     * Toggle star
     */
    toggleStar(event)
    {
        event.stopPropagation();

        this.job.toggleStar();
        this.jobService.updateJob(this.job);
    }

    /**
     * Toggle Important
     */
    toggleImportant(event)
    {
        event.stopPropagation();

        this.job.toggleImportant();
        this.jobService.updateJob(this.job);
    }

    /**
     * Toggle Completed
     */
    toggleCompleted(event)
    {
        event.stopPropagation();

        this.job.toggleCompleted();
        this.jobService.updateJob(this.job);
    }
}
