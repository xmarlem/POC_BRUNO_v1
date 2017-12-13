import { Component, OnDestroy, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit, AfterContentInit } from '@angular/core';
import { JobService } from '../job.service';
import { Job } from '../job.model';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FuseUtils } from '../../../../../core/fuseUtils';
import { fuseAnimations } from '../../../../../core/animations';
import { DateAdapter } from '@angular/material';

//MLMLML
import {MatChipInputEvent} from '@angular/material';
import {ENTER} from '@angular/cdk/keycodes';
import { MapsAPILoader } from '@agm/core';
//MLML nb. ho dovuto installare types googlemaps "npm install @types/googlemaps --save-dev"
import {} from 'googlemaps'; //MLML questo è necessario per poter usare l'oggetto google

const COMMA = 188;



@Component({
    selector   : 'fuse-job-details',
    templateUrl: './job-details.component.html',
    styleUrls  : ['./job-details.component.scss'],
    animations : fuseAnimations
})
export class FuseJobDetailsComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy
{
    //CHIPS (SKILLS)
    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;

    // Enter, comma
    separatorKeysCodes = [ENTER, COMMA];

    // roles: any[] = [
    //     {
    //         name: 'Project Manager'
    //     },
    //     {
    //         name: 'Developer'
    //     },
    //     {
    //         name: 'Senior Developer'
    //     },
    //     {
    //         name: 'Line Manager'
    //     },
    //     {
    //         name: 'Solution Architect'
    //     }
    // ];

    roles: any[] = [
        {
          name: 'Project Manager'
        },
        {
          name: 'Business Engineer'
        },
        {
          name: 'Requirements Engineer'
        },
        {
          name: 'Application Support'
        },
        {
          name: 'Application Developer'
        },
        {
          name: 'Solution Architect'
        }
    
      ];




    areas: any[] = [
        {
            name: 'Payments'
        },
        {
            name: 'TAX'
        },
        {
            name: 'Credit Risk'
        },
        {
            name: 'Accounting'
        }
    ];

    skillsList: any[] = [
        'C++', 
        'Java', 
        'Angular', 
        'Oracle', 
        'Credit Risk', 
        'Problem Solving', 
        'SAS', 
        'Front Office', 
        'SCRUM', 
        'Agile development', 
        'Python',
        'Empathetic',
        'Independent',
        'Innovator',
        'Resilient',
        'Team Player',
        'Requirement Engineering'        
    ];
    

    public zoom: number;
    @ViewChild("searchControl", {read: ElementRef}) public searchElementRef: ElementRef;
//    @ViewChild("searchControl") public searchElementRef: ElementRef;
    
//END LOCATION


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
        private dateAdapter:DateAdapter<Date>, //ML
        private mapsAPILoader: MapsAPILoader, //ML
        private ngZone: NgZone  //ML
    )
    {
        //mi serve per avere le date nel formato corretto
        this.dateAdapter.setLocale('en-GB');
    }


    ngAfterViewInit(){
        // this.loadMapStuff();
    }

    ngAfterContentInit(){
        //   this.loadMapStuff(); 
    }

    ngOnInit()
    {
        
        //ON JOB SELECTED --> entering in EDIT MODE
        //raised once the user click on an item (job)
        // Subscribe to update the current job
        this.onCurrentJobChanged =
            this.jobService.onCurrentJobChanged
                .subscribe(([job, formType]) => {

                    if ( job && formType === 'edit' )
                    {
                        this.formType = 'edit';

                        this.job = job;


                        if (!this.job.latitude || !this.job.longitude){
                            this.job.latitude = 47.355614;
                            this.job.longitude = 8.515962;
                            this.job.location = "Uetlihof 2, Uetlibergstrasse, Zurigo";
                        }

                        // console.log("in onCurrentJobChanged");
                        // console.log(this.job.location);

                        this.jobForm = this.createJobForm();
                        
                        //REFRESH UI status
                        this.allocationTypeChanged({value: this.job.allocationType});


                        //debugger;
                        
                        //this.loadMapStuff();

                        //set the ROLE
//                        console.log(this.job.role);
//                        console.log("VALORE: "+ this.jobForm.get('roleCtrl').value);
//                        this.jobForm.get('roleCtrl').setValue(this.job.role);
//                        console.log("VALORE: "+ this.jobForm.get('roleCtrl').value);
                                                
                        //MLMLML
                        //this.jobForm.get('startDate').setValue(this.job.startDate);
                        //console.log(this.jobForm.get('startDate').setValue(this.job.startDate));    

                        //Qui metto la gestione dell'evento VALUE CHANGES (triggerato il subscribe ogni volta che cambia un elemento nel form)
                        this.onFormChange = this.jobForm.valueChanges
                                                .debounceTime(500)
                                                .distinctUntilChanged()
                                                .subscribe(data => {
                                                    //data.role = this.job.role;
                                                    //console.log("VALORE ROLE in data: " + data.role );
                                                    
                                                    // //PATCH                                                    
                                                    // if(this.searchElementRef){
                                                    //     //console.log("in onInit: "+ this.searchElementRef);
                                                    //     data.location = this.searchElementRef.nativeElement.value;
                                                    //     // console.log("Data location: " + data.location);
                                                    //     // console.log("Data title: " + data.title);
                                                    //     // console.log("Data test: " + data.test);    
                                                    // }
                                                
                                                    //end ML
                                                    console.log(this.jobForm.invalid);
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
                                                                        
                                        this.focusTitleField();
                                        this.jobService.onCurrentJobChanged.next([this.job, 'new']);
                                    });

        //this.loadMapStuff(); // --> moved to onViewInitCompleted
        //console.log("in createJobForm");    
            

    }

    focusTitleField()
    {
        setTimeout(() => {
            this.titleInputField.nativeElement.focus();
        });
    }


    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
            this.job.latitude = position.coords.latitude;
            this.job.longitude = position.coords.longitude;
            this.zoom = 12;
            });
        }
    }
    

    //Change in "AllocationType" --> disable/enable Allocation Percentage
    allocationTypeChanged(e){
        console.log("Allocation Type Changed");
        if(e.value === 'Full-time'){
            this.disabledPercValue = true;
            this.jobForm.get('allocationPerc').setValue(100);
        }
        else
        {
            this.disabledPercValue = false;
        }

    }

    loadMapStuff(){

        this.setCurrentPosition();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => { 
        //            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
            //console.log("Before the searchElementRef: "+this.searchElementRef);
            
            if(this.searchElementRef){
                let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                    types: ["address"]
                });


                //console.log("After the searchElementRef");

                autocomplete.addListener("place_changed", () => {
                    this.ngZone.run(() => {
                        //get the place result
                        console.log("place changed!");
                        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                        //verify result
                        if (place.geometry === undefined || place.geometry === null) {
                        return;
                        }                    
                        //set latitude, longitude and zoom
                        // console.log(place);
                        // console.log(place.formatted_address);
                        // console.log(place.adr_address);
                        // console.log("Place: " + JSON.stringify(place) );
                        // console.log(place.address_components[1]);
                        // console.log(place.address_components[2]);
                        // console.log(place.address_components[3]);
                        this.job.location = place.formatted_address;

                        //if required later...I should put also these as persistent.
                        this.job.latitude = place.geometry.location.lat();
                        this.job.longitude = place.geometry.location.lng();
                        this.zoom = 12;
                        
                        //console.log("Lat e Long: "+ this.job.latitude + " " + this.job.longitude);
                    });
                });

            }
        });
        //MLML END LOCATION

    }

    createJobForm()
    {
        //c.log(this.job.allocationType);
        //console.log(this.job.notes);
        //console.log("In CreateJob: " + this.job.location);
        //console.log(this.job.role);
        
        //refresh

        return this.formBuilder.group({
            'id'       : [this.job.id],
            'title'    : [this.job.title],
            'description'    : [this.job.description],
            'role'     : [this.job.role],
            'area'     : [this.job.area],
            'startDate': [new Date(this.job.startDate)],
            'dueDate'  : [new Date(this.job.dueDate)],
            'completed': [this.job.completed],
            'starred'  : [this.job.starred],
            'important': [this.job.important],
            'deleted'  : [this.job.deleted],
            'tags'     : [this.job.tags],
            'allocationType': [this.job.allocationType],
            'allocationPerc': [this.job.allocationPerc],
            'searchControl': [this.job.location],
            'skills'       : [this.job.skills]
            //'test': [this.job.location]
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



    // logga(){
    //     console.log(this.jobForm.invalid);
    // }
}
