import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FuseConfigService } from '../../core/services/config.service';
import { AuthenticationService } from 'app/core/users/authentication.service';

@Component({
    selector   : 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class FuseToolbarComponent
{
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;

    //MLML
    currentUser:any;

    constructor(
        private router: Router,
        private fuseConfig: FuseConfigService,
        private authenticationService: AuthenticationService
    )
    {
        //MLML
        this.currentUser = this.authenticationService.currentUser;


        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                'id'   : 'en',
                'title': 'English',
                'flag' : 'en'
            },
            {
                'id'   : 'de',
                'title': 'Deutch',
                'flag' : 'de'
            },
            {
                'id'   : 'it',
                'title': 'Italian',
                'flag' : 'it'
            },
            {
                'id'   : 'es',
                'title': 'Spanish',
                'flag' : 'es'
            },
            {
                'id'   : 'tr',
                'title': 'Turkish',
                'flag' : 'tr'
            }
        ];

        this.selectedLanguage = this.languages[0];

        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.showLoadingBar = true;
                }
                if ( event instanceof NavigationEnd )
                {
                    this.showLoadingBar = false;
                }
            });

        this.fuseConfig.onSettingsChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
        });

    }

    logout(){
        this.authenticationService.logout()
            .then(
                () => {
                    this.router.navigate(['pages/auth/login-2'])
                        // .then(
                        //     (u) => console.log(u)
                        // )
                    //console.log("Logout done!");
                }
            )
            
    }

    search(value)
    {
        // Do your search here...
        console.log(value);
    }
}
