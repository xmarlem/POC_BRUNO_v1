import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SkillsService implements Resolve<any>
{
    skills: any;
    about: any;
    photosVideos: any;

    skillsOnChanged: BehaviorSubject<any> = new BehaviorSubject({});
    aboutOnChanged: BehaviorSubject<any> = new BehaviorSubject({});
    photosVideosOnChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private http: HttpClient)
    {
      //console.log("in Skillsservice... " );
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
                this.getSkills()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get skills
     */
    getSkills(): Promise<any[]>
    {
        return new Promise((resolve, reject) => {

            this.http.get('api/skills')
                .subscribe((skills: any) => {
                    this.skills = skills.data;
                    //console.log(skills.data);
                    this.skillsOnChanged.next(this.skills);
                    resolve(this.skills);
                }, reject);
        });
    }


}
