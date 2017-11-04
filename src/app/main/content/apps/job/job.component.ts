import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JobService } from './job.service';
import { FormControl } from '@angular/forms';
import { Job } from './job.model';
import { fuseAnimations } from '../../../../core/animations';

@Component({
    selector   : 'fuse-job',
    templateUrl: './job.component.html',
    styleUrls  : ['./job.component.scss'],
    animations : fuseAnimations
})
export class FuseJobComponent implements OnInit, OnDestroy
{
    hasSelectedJobs: boolean;
    isIndeterminate: boolean;
    filters: any[];
    tags: any[];
    searchInput: FormControl;
    currentJob: Job;

    onSelectedJobsChanged: Subscription;
    onFiltersChanged: Subscription;
    onTagsChanged: Subscription;
    onCurrentJobChanged: Subscription;

    constructor(private jobService: JobService)
    {
        this.searchInput = new FormControl('');
    }

    ngOnInit()
    {

        this.onSelectedJobsChanged =
            this.jobService.onSelectedJobsChanged
                .subscribe(selectedJobs => {

                    setTimeout(() => {
                        this.hasSelectedJobs = selectedJobs.length > 0;
                        this.isIndeterminate = (selectedJobs.length !== this.jobService.jobs.length && selectedJobs.length > 0);
                    }, 0);
                });

        this.onFiltersChanged =
            this.jobService.onFiltersChanged
                .subscribe(folders => {
                    this.filters = this.jobService.filters;
                });

        this.onTagsChanged =
            this.jobService.onTagsChanged
                .subscribe(tags => {
                    this.tags = this.jobService.tags;
                });

        this.searchInput.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchText => {
                this.jobService.onSearchTextChanged.next(searchText);
            });

        this.onCurrentJobChanged =
            this.jobService.onCurrentJobChanged
                .subscribe(([currentJob, formType]) => {
                    if ( !currentJob )
                    {
                        this.currentJob = null;
                    }
                    else
                    {
                        this.currentJob = currentJob;
                    }
                });
    }

    deSelectCurrentJob()
    {
        this.jobService.onCurrentJobChanged.next([null, null]);
    }

    ngOnDestroy()
    {
        this.onSelectedJobsChanged.unsubscribe();
        this.onFiltersChanged.unsubscribe();
        this.onTagsChanged.unsubscribe();
        this.onCurrentJobChanged.unsubscribe();
    }

    toggleSelectAll()
    {
        this.jobService.toggleSelectAll();
    }

    selectJobs(filterParameter?, filterValue?)
    {
        this.jobService.selectJobs(filterParameter, filterValue);
    }

    deselectJobs()
    {
        this.jobService.deselectJobs();
    }

    toggleTagOnSelectedJobs(tagId)
    {
        this.jobService.toggleTagOnSelectedJobs(tagId);
    }

}
