import { FuseNavigationService } from './../../../../../core/components/navigation/navigation.service';
import { JobsService } from './jobs.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ProjectsDashboardService } from './projects.service';
import * as shape from 'd3-shape';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';



//MLML
//import { TodoService } from '../../todo/todo.service';
//import { FormControl } from '@angular/forms';
//import { FuseTodoListComponent } from '../../todo/todo-list/todo-list.component';
//MLMLML END
//import { FuseTodoListItemComponent } from '../../todo/todo-list/todo-list-item/todo-list-item.component';
import { Job } from './job.model';
import { fuseAnimations } from '../../../../../core/animations';


//import { FusePriceTablesComponent } from "../../../components/price-tables/price-tables.component";
import { MatSnackBar } from '@angular/material';




@Component({
    selector     : 'fuse-project',
    templateUrl  : './project.component.html',
    styleUrls    : ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseProjectComponent implements OnInit, OnDestroy
{
    projects: any[];
    selectedProject: any;

    widgets: any;
    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};

    dateNow = Date.now();


    //BEGIN ML
    // Top job positions
    jobs: any[];
    tags: any[];
    @Input() job: Job;



    jobcards: any[];
    //END ML




    constructor(private projectsDashboardService: ProjectsDashboardService,
                private snackBar: MatSnackBar,
                private jobsService: JobsService,
                private navigationService: FuseNavigationService
            )
    {
        this.projects = this.projectsDashboardService.projects;

        this.selectedProject = this.projects[0];

        this.widgets = this.projectsDashboardService.widgets;


        //MLMLMLLM
        this.jobs = this.projectsDashboardService.jobs;
        //console.log(this.jobs);
        this.tags = [1, 4];


        jobsService.getJobs()
            .then( jobs => this.jobcards = jobs )
        //MLMLMLM END

        /**
         * Widget 5
         */
        this.widget5 = {
            currentRange  : 'TW',
            xAxis         : true,
            yAxis         : true,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            onSelect      : (ev) => {
                console.log(ev);
            },
            supporting    : {
                currentRange  : '',
                xAxis         : false,
                yAxis         : false,
                gradient      : false,
                legend        : false,
                showXAxisLabel: false,
                xAxisLabel    : 'Days',
                showYAxisLabel: false,
                yAxisLabel    : 'Isues',
                scheme        : {
                    domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
                },
                curve         : shape.curveBasis
            }
        };

        /**
         * Widget 6
         */
        this.widget6 = {
            currentRange : 'TW',
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : true,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 7
         */
        this.widget7 = {
            currentRange: 'T'
        };

        /**
         * Widget 8
         */
        this.widget8 = {
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : false,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 9
         */
        this.widget9 = {
            currentRange  : 'TW',
            xAxis         : false,
            yAxis         : false,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            curve         : shape.curveBasis
        };

        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);

    }

// BEGIN ML --- OPEN POSITIONS --- JOBS

    toggleSelectAll()
    {
//        this.todoService.toggleSelectAll();
    }

    getColor(job){
        return("rgba('112, 219, 112," + job.completed+")");
    }

    /**
     * Toggle star
     */
    toggleStar(event)
    {
        event.stopPropagation();

        this.job.toggleStar();
      //  this.todoService.updateTodo(this.todo);
    }

    /**
     * Toggle Important
     */
    toggleImportant(event)
    {
        event.stopPropagation();

        this.job.toggleImportant();
      //  this.todoService.updateTodo(this.todo);
    }

    /**
     * Toggle Completed
     */
    toggleCompleted(event)
    {
        event.stopPropagation();

        this.job.toggleCompleted();
       // this.todoService.updateTodo(this.todo);
    }

    selectTodos(filterParameter?, filterValue?)
    {
        //this.todoService.selectTodos(filterParameter, filterValue);
    }

    deselectTodos()
    {
        //this.todoService.deselectTodos();
    }



// END ML --- OPEN POSITIONS --- JOBS --- 
    ngOnInit()
    {
        /**
         * Widget 11
         */
        this.widget11.onContactsChanged = new BehaviorSubject({});
        this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
        this.widget11.dataSource = new FilesDataSource(this.widget11);


        //TEST MLMLMLLML
        setTimeout( 
            () => {
                this.snackBar.open("A new position macthing to your job profile is available","Info!", { duration: 3000,});
                this.jobcards.unshift({
                    'id': 3,
                    'title': 'Security Engineer',
                    'area': 'IT',
                    'location': 'Switzerland-Zurich',
                    'contracttype': '/ part-time (80%)',
                    'description': "<br> <u><b>We use the latest and the most sophisticated security software</b></u> to protect our infrastructure and data across the globe. We are seeking for a skilled individual who has the passion to work with vastly scaled client security IT systems and who would help us keep the highest level of security required by the global financial enterprise.<br /> \
                    This role includes engineering of Tanium endpoint security solution for monitoring, detection and response to security threats related to ten thousands of end points based on Windows OS (Windows 7 and Windows 10). The scope of duties covers also continuous improvement of existing environment, engineering of changes, finding and fixing security issues in IT systems, responding to security incidents and delivering new functionalities and upgrades. <br /> \
                    <blockquote>You will be a part of the team of highly qualified engineers spanning across multiple locations (primarily Wroclaw). We provide stable but flexible work environment, career development opportunities and broad range of other benefits available to every permanent Credit Suisse employee.<br /></blockquote> \
                    <u><b>Responsibilities include:</b></u> <br /> <ul> <li>Work with Tanium endpoint security product</li> \
                    <li>Security requirements analysis</li> \
                    <li>Respond to production incidents</li> \
                    <li>Configuration and fine-tuning of client security systems</li> \
                    <li>Oversee system changes and test upgrades before production deployment</li> \
                    <li>Support management in security audits and assessments</li> \
                    <li>Build security awareness and knowledge in the organisation</li> <li>Deliver required technical documentation</li> <li>Open to discussing flexible/agile working.</ul>",
                    'isNew': true,
                    'matching': '90%'
                },)

                //audio
                let audio = new Audio();
                audio.src = "assets/audio/popup.m4a";
                audio.play();

                const dashNavItem = this.navigationService.getNavigationItem('applications.dashboard');
                //console.log(mailNavItem.badge);
                // Update the badge title
                dashNavItem.badge.title = 3;
              

            }
            , 5000);


    }

    ngOnDestroy()
    {
    }

}

export class FilesDataSource extends DataSource<any>
{
    constructor(private widget11)
    {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]>
    {
        return this.widget11.onContactsChanged;
    }

    disconnect()
    {
    }
}

