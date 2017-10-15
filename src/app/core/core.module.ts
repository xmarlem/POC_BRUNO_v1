import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf }       from '@angular/core';

import { CommonModule }      from '@angular/common';
import { AuthGuardService }       from './users/auth-guard/auth-guard.service';
import { UsersComponent } from 'app/core/users/users.component';
import { AuthenticationService } from '../core/users/authentication.service';



  @NgModule({
    imports:      [ CommonModule ],
    declarations: [ UsersComponent ],
    exports:      [  ],
    providers:    [
        AuthGuardService,
        AuthenticationService
        
    ]
  })
  export class CoreModule {
  }