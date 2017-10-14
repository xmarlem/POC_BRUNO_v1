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

    //MLML
    get user(): any {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    checkMenuItem(url):boolean{
        let u = this.user;
        if(u){
            //console.log(url);
            if(u.email==='marco@gmail.com' && url!== '/apps/todo')
                return true;
            else 
                if(u.email==='bruno@gmail.com' && url=== '/apps/todo')
                    return true;
                else 
                    return false;
                
        }
        else false;
    }
    //MLL end

    constructor()
    {
    }

    ngOnInit()
    {
    }
}
