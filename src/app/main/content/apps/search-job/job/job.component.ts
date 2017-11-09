import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SearchJobJobService } from './job.service';
import { fuseAnimations } from '../../../../../core/animations';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { Job } from './job.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseUtils } from '../../../../../core/fuseUtils';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({
    selector     : 'fuse-search-job-job',
    templateUrl  : './job.component.html',
    styleUrls    : ['./job.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseSearchJobJobComponent implements OnInit, OnDestroy
{
    job = new Job();
    onProductChanged: Subscription;
    pageType: string;
    jobForm: FormGroup;

    constructor(
        private jobService: SearchJobJobService,
        private formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
        private location: Location
    )
    {

    }

    ngOnInit()
    {
        // Subscribe to update job on changes
        this.onProductChanged =
            this.jobService.onProductChanged
                .subscribe(job => {

                    if ( job )
                    {
                        this.job = new Job(job);
                        this.pageType = 'edit';
                    }
                    else
                    {
                        this.pageType = 'new';
                        this.job = new Job();
                    }

                    this.jobForm = this.createProductForm();
                });

    }

    createProductForm()
    {
        return this.formBuilder.group({
            id              : [this.job.id],
            name            : [this.job.name],
            handle          : [this.job.handle],
            description     : [this.job.description],
            categories      : [this.job.categories],
            tags            : [this.job.tags],
            images          : [this.job.images],
            priceTaxExcl    : [this.job.priceTaxExcl],
            priceTaxIncl    : [this.job.priceTaxIncl],
            taxRate         : [this.job.taxRate],
            comparedPrice   : [this.job.comparedPrice],
            quantity        : [this.job.quantity],
            sku             : [this.job.sku],
            width           : [this.job.width],
            height          : [this.job.height],
            location        : [this.job.location],
            startDate       : [this.job.startDate],
            extraShippingFee: [this.job.extraShippingFee],
            active          : [this.job.active]
        });
    }

    saveProduct()
    {
        const data = this.jobForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);
        this.jobService.saveProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this.jobService.onProductChanged.next(data);

                // Show the success message
                this.snackBar.open('Job position saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    addProduct()
    {
        const data = this.jobForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);
        this.jobService.addProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this.jobService.onProductChanged.next(data);

                // Show the success message
                this.snackBar.open('Job position added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this.location.go('apps/search-job/jobs/' + this.job.id + '/' + this.job.handle);
            });
    }

    ngOnDestroy()
    {
        this.onProductChanged.unsubscribe();
    }
}
