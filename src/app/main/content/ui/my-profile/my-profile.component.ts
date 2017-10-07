import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { fuseAnimations } from '../../../../core/animations';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

//ML
//import { SkillsService } from './skills.service';

@Component({
    selector   : 'my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls  : ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit
{
    form: FormGroup;
    formErrors: any;


    //begin ML

    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;


    //for Accordion
    step = 0;

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }


    //==========================
    //
    //for CURRENT SKILLS
    //
    //==========================
 
    currentSkills = [];
    options = ['C++', 'Java', 'Angular', 'Oracle', 'Credit Risk', 'Problem Solving', 'SAS', 'Global Markets', 'Front Office', 'SCRUM', 'Agile development', 'Python' ];
    myControl: FormControl = new FormControl();
    filteredOptions: Observable<string[]>;

    addSkill(){
        //console.log(this.skillsService.skills);

        var el = 
            {
                id: Date.now(),
                skill: '',
                proficiency: ''
            };

        //console.log("Elemento aggiunto: " + el.id);

        this.currentSkills.push(el);


    }
    removeSkill(skill){
//      console.log("Skill passato: " + skill);
//        console.log("Skills presenti in cache: " + this.currentSkills);
        var index = this.currentSkills.indexOf(skill);

//        console.log("Dovrei eliminare: " + index);
        if (index > -1){
            this.currentSkills.splice(index, 1);
        }
    }


    //==========================
    //
    //for ASPIRATIONAL SKILLS
    //
    //==========================




    //end ML

    constructor(private formBuilder: FormBuilder)
    {
        this.formErrors = {
            company   : {},
            firstName : {},
            lastName  : {},
            address   : {},
            address2  : {},
            city      : {},
            state     : {},
            postalCode: {}
        };
    }

    //SKILLS
    filter(val: string): string[] 
    {
      return this.options.filter(option =>
        option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }


    ngOnInit()
    {


      // SKILLS ------- 
        console.log(this.myControl);
        this.filteredOptions = this.myControl.valueChanges.startWith(null).map(val => val ? this.filter(val) : this.options.slice());
        console.log(this.filteredOptions);

      // ==============


        this.form = this.formBuilder.group({
            company   : [
                {
                    value   : 'Google',
                    disabled: true
                }, Validators.required
            ],
            firstName : ['', Validators.required],
            lastName  : ['', Validators.required],
            address   : ['', Validators.required],
            address2  : ['', Validators.required],
            city      : ['', Validators.required],
            state     : ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]]
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });



        //begin ML
            this.firstFormGroup = this.formBuilder.group({
              firstCtrl: ['Marco Lembo', Validators.required],
              divisionCtrl: [{value: 'SJSF 4', disabled: true}]
            });
            this.secondFormGroup = this.formBuilder.group({
              secondCtrl: ['', Validators.required]
            });

        // end ML
    }

    onFormValuesChanged()
    {
        for ( const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }
        }
    }
}
