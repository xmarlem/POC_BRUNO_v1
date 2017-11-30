import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchJobJobService implements Resolve<any>
{
    routeParams: any;
    job: any;
    onProductChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(
        private http: HttpClient
    )
    {
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        //console.log("in Resolve 1: " + JSON.stringify(route.params));        
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProduct()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getProduct(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onProductChanged.next(false);
                resolve(false);
            }
            else
            {
                console.log("in getProduct 0: " + this.job);        
                this.http.get('api/search-job-jobs/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.job = response;
                        console.log("in GetProduct: " + response.skills);
                        this.onProductChanged.next(this.job);
                        resolve(response);
                    }, reject);
            }
        });
    }

    saveProduct(job)
    {
        //console.log("in SaveProduct 1: " + JSON.stringify(job));        
        
        return new Promise((resolve, reject) => {
            this.http.post('api/search-job-jobs/' + job.id, job)
                .subscribe((response: any) => {
                    resolve(response);
                    console.log("Response: " + JSON.stringify(response));
                }, reject);
        });
    }

    addProduct(job)
    {
        return new Promise((resolve, reject) => {
            this.http.post('api/search-job-jobs/', job)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
