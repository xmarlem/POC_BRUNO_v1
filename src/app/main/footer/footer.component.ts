import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector   : 'fuse-footer',
    templateUrl: './footer.component.html',
    styleUrls  : ['./footer.component.scss']
})
export class FuseFooterComponent implements OnInit
{

    constructor(private router:Router)
    {
    }

    ngOnInit()
    {
    }

    goToFaq(){
        this.router.navigate(['pages/faq']);
    }

}
