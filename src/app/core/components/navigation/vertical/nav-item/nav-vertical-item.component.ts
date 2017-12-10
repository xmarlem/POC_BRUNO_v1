import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector   : 'fuse-nav-vertical-item',
    templateUrl: './nav-vertical-item.component.html',
    styleUrls  : ['./nav-vertical-item.component.scss']
})
export class FuseNavVerticalItemComponent implements OnInit
{
    @HostBinding('class') classes = 'nav-item';
    @Input() item: any;


    publisherMenu = [
        "/apps/job",
        "/apps/dashboards/project",
        "/apps/search-job/jobs",
        "/ui/my-profile",
        "/apps/chat",
        "/apps/contacts",
        "/apps/mail",
        "/apps/calendar",
        "/pages/faq"
    ];

    userMenu = [
        "/apps/dashboards/project",
        "/apps/search-job/jobs",
        "/ui/my-profile",
        "/apps/chat",
        "/apps/contacts",
        "/apps/mail",
        "/apps/calendar",
        "/pages/faq"
    ];


    //MLML
    get user(): any {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    //TODO: da aggiustare!! E' hardcoded---- bisogna inserire la gestione dei ruoli
    checkMenuItem(url):boolean{
        let u = this.user;
        if(u){
//            console.log(u.email);
            // if(u.email==='stefan@gmx.ch' && url!== '/apps/job')
            //     return true;
            // else 
            //     if((u.email==='bruno@gmx.ch' || u.email==='daniel@gmx.ch') && url=== '/apps/job')
            //         return true;
            //     else 
            //         return false;


            if(u.role === 'publisher'){

                if(this.publisherMenu.includes(url)){
                    return true;
                }
            }
            else if (u.role === 'user'){
                if(this.userMenu.includes(url)){
                    return true;
                }
            }

                
        }
        else return false;
    }
    //MLL end

    constructor()
    {
    }

    ngOnInit()
    {
    }
}
