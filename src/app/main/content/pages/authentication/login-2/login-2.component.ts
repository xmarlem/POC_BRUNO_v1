import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';
import { Router } from '@angular/router';

import { MessageService} from 'primeng/components/common/messageservice';
import { AuthenticationService } from 'app/core/users/authentication.service';

import {Message} from 'primeng/primeng';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';





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
    onCurrentUserValidationErrors: Subscription;
    onLogin: Subscription;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private authService:AuthenticationService,
        private router:Router,
        private messageService: MessageService,
        private snackBar: MatSnackBar
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

    login2(){
        let email:string = this.loginForm.get('email').value;
        let password:string = this.loginForm.get('password').value;
        this.onLogin = this.authService.login2(email, password)
            .subscribe(
                (user) => {
                    console.log("In onNext ... " + user.role);
                    //let role = JSON.parse(localStorage.getItem('currentUser')).role;
                    
                    if(user.role === 'user'){
                        this.router.navigate(['']);                                                    
                    }
                    else if(user.role === 'publisher'){
                        this.router.navigate(['apps/todo/all']);                                                                            
                    }
                },
                (err) => {
                    //console.log("Errore password!! voglio scatenare un messaggio..."+ err);
                    this.messageService.add({severity:'error', summary:'Error', detail:err});
                    this.snackBar.open(err,"Error!", {
                        duration: 2000,
                    })    
                }
            )

    }


    //no longer used
    login(){
        let email:string = this.loginForm.get('email').value;
        let password:string = this.loginForm.get('password').value;
        this.authService.login(email, password);

    }

    ngOnDestroy(){
        //this.onLogin.unsubscribe;
        //this.onCurrentUser.unsubscribe;
    }
}
