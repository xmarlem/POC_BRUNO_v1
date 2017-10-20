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
                private jobsService: JobsService)
    {
        this.projects = this.projectsDashboardService.projects;

        this.selectedProject = this.projects[0];

        this.widgets = this.projectsDashboardService.widgets;


        //MLMLMLLM
        this.jobs = this.projectsDashboardService.jobs;
        console.log(this.jobs);
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
                this.snackBar.open("A new position macthing to your job profile is available","Info!", { duration: 5000,});
                this.jobcards.unshift({
                    'id': 3,
                    'title': 'Security Engineer',
                    'area': 'IT',
                    'location': 'Poland-Wroclaw',
                    'contracttype': '/ part-time (80%)',
                    'description': 'You will be a part of the team of highly qualified engineers spanning across multiple locations (primarily Wroclaw). We provide stable but flexible work environment, career development opportunities and broad range of other benefits available to every permanent Credit Suisse employee.',
                    'isNew': true,
                    'matching': '90%'
                },)
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

