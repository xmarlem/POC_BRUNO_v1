import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector   : 'fuse-ngx-datatable',
    templateUrl: './ngx-datatable.component.html',
    styleUrls  : ['./ngx-datatable.component.scss']
})
export class FuseNgxDatatableComponent implements OnInit
{
    rows: any[];
    loadingIndicator = true;
    reorderable = true;

    constructor(private http: HttpClient)
    {

    }

    ngOnInit()
    {
        this.http.get('api/contacts-contacts')
            .subscribe((contacts: any) => {
                this.rows = contacts; //3-nov-2017 - Porting: Merge branch 'master' of https://github.com/withinpixels/fuse2
                this.loadingIndicator = false;
            });
    }
}
