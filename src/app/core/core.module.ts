import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf }       from '@angular/core';

import { CommonModule }      from '@angular/common';
import { AuthGuardService }       from './users/auth-guard/auth-guard.service';
import { AuthenticationService } from '../core/users/authentication.service';
import { UsersService } from 'app/core/users/users.service';



  @NgModule({
    imports:      [ CommonModule ],
    declarations: [ ],
    exports:      [  ],
    providers:    [
        AuthGuardService,
        AuthenticationService,
        UsersService
        
    ]
  })
  export class CoreModule {
  }