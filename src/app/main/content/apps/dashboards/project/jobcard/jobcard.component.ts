import { Component, OnInit, Input } from '@angular/core';
import { JobsService } from 'app/main/content/apps/dashboards/project/jobs.service';

@Component({
  selector: 'ml-jobcard',
  templateUrl: './jobcard.component.html',
  styleUrls: ['./jobcard.component.scss']
})
export class JobcardComponent implements OnInit {

  @Input() job: any;

  constructor(private jobcardService:JobsService) { 
    
  }

  ngOnInit() {
  }

}
