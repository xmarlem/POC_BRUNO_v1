import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';
import { Router } from '@angular/router';

import { MessageService} from 'primeng/components/common/messageservice';
import { AuthenticationService } from 'app/core/users/authentication.service';

import {Message} from 'primeng/primeng';
import { MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';





@Component({
    selector   : 'fuse-login-2',
    templateUrl: './login-2.component.html',
    styleUrls  : ['./login-2.component.scss'],
    animations : fuseAnimations
})
export class FuseLogin2Component implements OnInit
{
    loginForm: FormGroup;
    loginFormErrors: any;

    msgs: Message[] = [];

    //MLML
    onCurrentUser: Subscription;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private authService:AuthenticationService,
        private router:Router,
        private messageService: MessageService,
        private snackBar: MdSnackBar
    )
    {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.loginFormErrors = {
            email   : {},
            password: {}
        };

        //MLML
        this.authService.onCurrentUser
            .subscribe(
                (u) => {
                    console.log("OnNext event received... in onCurrentUser, am about to navigate to home " );
                    this.router.navigate(['']);                    
                },
                (err) => {
                    this.messageService.add({severity:'error', summary:'Error', detail:err.message});
                    this.snackBar.open(err.message,"Error!", {
                        duration: 2000,
                    })    
                }
            )

    }

    ngOnInit()
    {

        //Reset login status TODO:
        this.authService.logout();

        this.loginForm = this.formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    onLoginFormValuesChanged()
    {
        for ( const field in this.loginFormErrors )
        {
            if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    login(){
        let email:string = this.loginForm.get('email').value;
        let password:string = this.loginForm.get('password').value;
        this.authService.login(email, password);

        // //console.log('In login:', email, password );
        // this.authService.login(email,password)
        //     .then( user => {
        //         //Here I store the user in the localStorage
        //         localStorage.setItem('currentUser', JSON.stringify(user));
        //         //this.authService.setUser(user);
        //         console.log(localStorage.getItem('currentUser'));
        //         this.router.navigate(['']);
        //     })
        //     .catch( err => {
        //         this.messageService.add({severity:'error', summary:'Error', detail:err.message});
        //         this.snackBar.open(err.message,"Error!", {
        //             duration: 2000,
        //         })
        //     });

    }

}
