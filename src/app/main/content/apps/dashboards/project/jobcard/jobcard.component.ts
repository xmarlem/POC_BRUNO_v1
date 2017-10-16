import { Component, OnInit } from '@angular/core';
import { JobsService } from 'app/main/content/apps/dashboards/project/jobs.service';

@Component({
  selector: 'ml-jobcard',
  templateUrl: './jobcard.component.html',
  styleUrls: ['./jobcard.component.scss']
})
export class JobcardComponent implements OnInit {

  jobs: any[] = [];

  constructor(private jobcardService:JobsService) { 
    
  }

  ngOnInit() {
    console.log("in ngOnInit di jobcard.component");
    this.jobcardService.getJobs()
      .then(
        (jobs) =>{
          console.log("in then "+ jobs);
          this.jobs = jobs;         
        }
      )
  }

}
