import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Job } from './job.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FuseUtils } from '../../../../core/fuseUtils';
import { Subject } from 'rxjs/Subject';
import { Location } from '@angular/common';

@Injectable()
export class JobService implements Resolve<any>
{
    jobs: Job[];
    selectedJobs: Job[];
    currentJob: Job;
    searchText = '';

    filters: any[];
    tags: any[];
    routeParams: any;

    onJobsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onSelectedJobsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onCurrentJobChanged: BehaviorSubject<any> = new BehaviorSubject([]);

    onFiltersChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onTagsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onSearchTextChanged: BehaviorSubject<any> = new BehaviorSubject('');
    onNewJobClicked: Subject<any> = new Subject();

    constructor(
        private http: HttpClient,
        private location: Location // Set current job
    )
    {
        this.selectedJobs = [];
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getFilters(),
                this.getTags(),
                this.getJobs()
            ]).then(
                () => {
                    if ( this.routeParams.jobId )
                    {
                        this.setCurrentJob(this.routeParams.jobId);
                    }
                    else
                    {
                        this.setCurrentJob(null);
                    }

                    this.onSearchTextChanged.subscribe(searchText => {
                        if ( searchText !== '' )
                        {
                            this.searchText = searchText;
                            this.getJobs();
                        }
                        else
                        {
                            this.searchText = searchText;
                            this.getJobs();
                        }
                    });
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get all filters
     * @returns {Promise<any>}
     */
    getFilters(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get('api/job-filters')
                .subscribe((response: any) => {
                    this.filters = response;
                    this.onFiltersChanged.next(this.filters);
                    resolve(this.filters);
                }, reject);
        });
    }

    /**
     * Get all tags
     * @returns {Promise<any>}
     */
    getTags(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.http.get('api/job-tags')
                .subscribe((response: any) => {
                    this.tags = response;
                    this.onTagsChanged.next(this.tags);
                    resolve(this.tags);
                }, reject);
        });
    }

    /**
     * Get jobs
     * @returns {Promise<Job[]>}
     */
    getJobs(): Promise<Job[]>
    {
        if ( this.routeParams.tagHandle )
        {
            return this.getJobsByTag(this.routeParams.tagHandle);
        }

        if ( this.routeParams.filterHandle )
        {
            return this.getJobsByFilter(this.routeParams.filterHandle);
        }

        return this.getJobsByParams(this.routeParams);
    }

    /**
     * Get jobs by params
     * @param handle
     * @returns {Promise<Job[]>}
     */
    getJobsByParams(handle): Promise<Job[]>
    {
        return new Promise((resolve, reject) => {

            this.http.get('api/job-jobs')
                .subscribe((jobs: any) => {
                    this.jobs = jobs.map(job => {
                        return new Job(job);
                    });

                    this.jobs = FuseUtils.filterArrayByString(this.jobs, this.searchText);

                    this.onJobsChanged.next(this.jobs);

                    resolve(this.jobs);
                });
        });
    }

    /**
     * Get jobs by filter
     * @param handle
     * @returns {Promise<Job[]>}
     */
    getJobsByFilter(handle): Promise<Job[]>
    {

        let param = handle + '=true';

        if ( handle === 'dueDate' )
        {
            param = handle + '=^$|\\s+';
        }

        return new Promise((resolve, reject) => {

            this.http.get('api/job-jobs?' + param)
                .subscribe((jobs: any) => {

                    this.jobs = jobs.map(job => {
                        return new Job(job);
                    });

                    this.jobs = FuseUtils.filterArrayByString(this.jobs, this.searchText);

                    this.onJobsChanged.next(this.jobs);

                    resolve(this.jobs);

                }, reject);
        });
    }

    /**
     * Get jobs by tag
     * @param handle
     * @returns {Promise<Job[]>}
     */
    getJobsByTag(handle): Promise<Job[]>
    {
        return new Promise((resolve, reject) => {
            this.http.get('api/job-tags?handle=' + handle)
                .subscribe((tags: any) => {

                    const tagId = tags[0].id;

                    this.http.get('api/job-jobs?tags=' + tagId)
                        .subscribe((jobs: any) => {

                            this.jobs = jobs.map(job => {
                                return new Job(job);
                            });

                            this.jobs = FuseUtils.filterArrayByString(this.jobs, this.searchText);

                            this.onJobsChanged.next(this.jobs);

                            resolve(this.jobs);

                        }, reject);
                });
        });
    }

    /**
     * Toggle selected job by id
     * @param id
     */
    toggleSelectedJob(id)
    {
        // First, check if we already have that job as selected...
        if ( this.selectedJobs.length > 0 )
        {
            for ( const job of this.selectedJobs )
            {
                // ...delete the selected job
                if ( job.id === id )
                {
                    const index = this.selectedJobs.indexOf(job);

                    if ( index !== -1 )
                    {
                        this.selectedJobs.splice(index, 1);

                        // Trigger the next event
                        this.onSelectedJobsChanged.next(this.selectedJobs);

                        // Return
                        return;
                    }
                }
            }
        }

        // If we don't have it, push as selected
        this.selectedJobs.push(
            this.jobs.find(job => {
                return job.id === id;
            })
        );

        // Trigger the next event
        this.onSelectedJobsChanged.next(this.selectedJobs);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll()
    {
        if ( this.selectedJobs.length > 0 )
        {
            this.deselectJobs();
        }
        else
        {
            this.selectJobs();
        }

    }

    selectJobs(filterParameter?, filterValue?)
    {
        this.selectedJobs = [];

        // If there is no filter, select all jobs
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedJobs = this.jobs;
        }
        else
        {
            this.selectedJobs.push(...
                this.jobs.filter(job => {
                    return job[filterParameter] === filterValue;
                })
            );
        }

        // Trigger the next event
        this.onSelectedJobsChanged.next(this.selectedJobs);
    }

    deselectJobs()
    {
        this.selectedJobs = [];

        // Trigger the next event
        this.onSelectedJobsChanged.next(this.selectedJobs);
    }

    /**
     * Set current job by id
     * @param id
     */
    setCurrentJob(id)
    {
        this.currentJob = this.jobs.find(job => {
            return job.id === id;
        });

        this.onCurrentJobChanged.next([this.currentJob, 'edit']);

        const tagHandle    = this.routeParams.tagHandle,
              filterHandle = this.routeParams.filterHandle;

        if ( tagHandle )
        {
            this.location.go('apps/job/tag/' + tagHandle + '/' + id);
        }
        else if ( filterHandle )
        {
            this.location.go('apps/job/filter/' + filterHandle + '/' + id);
        }
        else
        {
            this.location.go('apps/job/all/' + id);
        }

    }

    /**
     * Toggle tag on selected jobs
     * @param tagId
     */
    toggleTagOnSelectedJobs(tagId)
    {
        this.selectedJobs.map(job => {
            this.toggleTagOnJob(tagId, job);
        });
    }

    toggleTagOnJob(tagId, job)
    {

        const index = job.tags.indexOf(tagId);

        if ( index !== -1 )
        {
            job.tags.splice(index, 1);
        }
        else
        {
            job.tags.push(tagId);
        }
        this.updateJob(job);
    }

    /**
     * Update the job
     * @param job
     * @returns {Promise<any>}
     */
    updateJob(job)
    {
        return new Promise((resolve, reject) => {

            //console.log("inside update job");

            this.http.post('api/job-jobs/' + job.id, {...job})
                .subscribe(response => {

                    this.getJobs().then(jobs => {
                        //console.log(jobs);

                        resolve(jobs);

                    }, reject);
                });
        });
    }

    /**
     * Update the job
     * @param jobs
     * @returns {Promise<any>}
     */
    updateJobs(jobs)
    {

        /*  return new Promise((resolve, reject) => {

              this.http.post('api/job-jobs/', {...jobs})

                  .subscribe(response => {

                      this.getJobs().then(_jobs => {
                          console.log(response);
                          resolve(_jobs);
                      }, reject);
                  });
          });*/

    }
}
