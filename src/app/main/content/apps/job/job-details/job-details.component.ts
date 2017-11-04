import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { JobService } from '../job.service';
import { Job } from '../job.model';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseUtils } from '../../../../../core/fuseUtils';
import { fuseAnimations } from '../../../../../core/animations';
import { DateAdapter } from '@angular/material';

@Component({
    selector   : 'fuse-job-details',
    templateUrl: './job-details.component.html',
    styleUrls  : ['./job-details.component.scss'],
    animations : fuseAnimations
})
export class FuseJobDetailsComponent implements OnInit, OnDestroy
{
    job: Job;
    tags: any[];
    formType: string;
    jobForm: FormGroup;
    //MLML
    jobAllocationTypeOptions: any[] = [
        'Full-time',
        'Part-time'
    ];

    selectedAllocationType: string;
    disabledPercValue: boolean = true;


    @ViewChild('titleInput') titleInputField;

    onFormChange: any;
    onCurrentJobChanged: Subscription;
    onTagsChanged: Subscription;
    onNewJobClicked: Subscription;

    constructor(
        private jobService: JobService,
        private formBuilder: FormBuilder,
        private dateAdapter:DateAdapter<Date> //ML
    )
    {
        this.dateAdapter.setLocale('en-GB');
    }

    ngOnInit()
    {
        // Subscribe to update the current job
        this.onCurrentJobChanged =
            this.jobService.onCurrentJobChanged
                .subscribe(([job, formType]) => {

                    if ( job && formType === 'edit' )
                    {
                        this.formType = 'edit';

                        this.job = job;

                        this.jobForm = this.createJobForm();

                        //console.log("in createJobForm");    
                        
                        //MLMLML
                        //this.jobForm.get('startDate').setValue(this.job.startDate);
                        //console.log(this.jobForm.get('startDate').setValue(this.job.startDate));    

                        

                        this.onFormChange = this.jobForm.valueChanges
                                                .debounceTime(500)
                                                .distinctUntilChanged()
                                                .subscribe(data => {
                                                    //ML --- disabilito/abilito la percentuale se selezionato full
                                                    if(data.allocationType==='Full-time'){
                                                        this.disabledPercValue = true;
                                                        this.jobForm.get('allocationPerc').setValue(100);
                                                    }
                                                    else
                                                    {
                                                        this.disabledPercValue = false;
                                                    }
                                                    //end ML
                                                    
                                                    this.jobService.updateJob(data);
                                                });
                    }
                });

        // Subscribe to update on tag change
        this.onTagsChanged =
            this.jobService.onTagsChanged
                .subscribe(labels => {
                    this.tags = labels;
                });

        // Subscribe to update on tag change
        this.onNewJobClicked = this.jobService.onNewJobClicked
                                    .subscribe(() => {
                                        this.job = new Job({});
                                        this.job.id = FuseUtils.generateGUID();
                                        this.formType = 'new';
                                        this.jobForm = this.createJobForm();
                                        //ML --- disabilito/abilito la percentuale se selezionato full
                                        if(this.job.allocationType==='Full-time'){
                                            this.disabledPercValue = true;
                                            this.jobForm.get('allocationPerc').setValue(100);
                                        }
                                        else
                                        {
                                            this.disabledPercValue = false;
                                        }
                                        //end ML                                                                               
                                        this.focusTitleField();
                                        this.jobService.onCurrentJobChanged.next([this.job, 'new']);
                                    });
    }

    focusTitleField()
    {
        setTimeout(() => {
            this.titleInputField.nativeElement.focus();
        });
    }

    createJobForm()
    {
        //console.log(this.job.allocationType);
        //console.log(this.job.notes);
        
        
        return this.formBuilder.group({
            'id'       : [this.job.id],
            'title'    : [this.job.title],
            'notes'    : [this.job.notes],
            'startDate': [new Date(this.job.startDate)],
            'dueDate'  : [new Date(this.job.dueDate)],
            'completed': [this.job.completed],
            'starred'  : [this.job.starred],
            'important': [this.job.important],
            'deleted'  : [this.job.deleted],
            'tags'     : [this.job.tags],
            'allocationType': [this.job.allocationType],
            'allocationPerc': [this.job.allocationPerc]
        });
    }

    toggleStar(event)
    {
        event.stopPropagation();

        this.job.toggleStar();

        this.jobService.updateJob(this.job);
    }

    toggleImportant(event)
    {
        event.stopPropagation();

        this.job.toggleImportant();

        this.jobService.updateJob(this.job);
    }

    /**
     * Toggle Completed
     * @param event
     */
    toggleCompleted(event)
    {
        event.stopPropagation();

        this.job.toggleCompleted();

        this.jobService.updateJob(this.job);
    }

    /**
     * Toggle Deleted
     * @param event
     */
    toggleDeleted(event)
    {
        event.stopPropagation();

        this.job.toggleDeleted();

        this.jobService.updateJob(this.job);
    }

    toggleTagOnJob(tagId)
    {
        this.jobService.toggleTagOnJob(tagId, this.job);
    }

    addJob()
    {
        this.jobService.updateJob(this.jobForm.getRawValue());
    }

    ngOnDestroy()
    {
        if ( this.onFormChange )
        {
            this.onFormChange.unsubscribe();
        }

        this.onCurrentJobChanged.unsubscribe();

        this.onNewJobClicked.unsubscribe();
    }
}
