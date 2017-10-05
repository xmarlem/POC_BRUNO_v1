import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//ML
import {MatChipsModule} from '@angular/material';

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

    ngOnInit()
    {
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
