import { MatSnackBar, MatDialogRef, MatDialog, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JobService } from './job.service';
import { FormControl } from '@angular/forms';
import { Job } from './job.model';
import { fuseAnimations } from '../../../../core/animations';
import { RecommendEmployeeComponent } from 'app/main/content/apps/job/recommend-employee/recommend-employee.component';

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

    dialogRef: any;
    snackBarRef: MatSnackBarRef<SimpleSnackBar>;


    constructor(private jobService: JobService,
                private snackBar: MatSnackBar,
                public dialog: MatDialog                
               )
    {
        this.searchInput = new FormControl('');
        //simulation for the request for recommendation
        this.snackBarRef = this.snackBar.open("You have 1 request for recommendation pending!", "Recommend now!");
                
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


        

        this.snackBarRef.onAction().subscribe(
            () => {
                this.recommendEmployee();
            }
        );

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

    //MLMLMLML
    recommendEmployee(){
        this.dialogRef = this.dialog.open(RecommendEmployeeComponent, {
            panelClass: 'recommend-employee-form-dialog', 
        });
        this.dialogRef.afterClosed()
        .subscribe((response) => {
            this.snackBar.open("Your recommendation message has been sent successfully!", 
            "Info!", 
            { duration: 2000, extraClasses: ['mat-accent-900-bg']});
        });

    }


}
