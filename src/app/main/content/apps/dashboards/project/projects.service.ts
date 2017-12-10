import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProjectsDashboardService implements Resolve<any>
{
    projects: any[];
    widgets: any[];

    //MLMLML
    jobs: any[];
    jobsOnChanged: BehaviorSubject<any> = new BehaviorSubject({});
    //MLMLML

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

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getProjects(),
                this.getWidgets(),
                //MLMLMLMML
                this.getJobPositions()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getProjects(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get('api/projects-dashboard-projects')
                .subscribe((response: any) => {
                    this.projects = response;
                    resolve(response);
                }, reject);
        });
    }

    getWidgets(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get('api/projects-dashboard-widgets')
                .subscribe((response: any) => {
                    this.widgets = response;
                    resolve(response);
                }, reject);
        });
    }


    //MLMLMLML
    getJobPositions(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get('api/projects-dashboard-jobPositions')
                .subscribe((response: any) => {
                    this.jobs = response;
                    resolve(response);
                }, reject);
        });

    }

//inserito per la mappa....
    getJobs(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get('api/job-jobs')
                .subscribe((response: any) => {
                    this.jobs = response;
                    this.jobsOnChanged.next(this.jobs);
                    resolve(response);
                }, reject);
        });
    }




}
