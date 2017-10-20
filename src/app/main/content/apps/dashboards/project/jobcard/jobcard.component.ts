import { JobcardDialogComponent } from './jobcard-dialog/jobcard-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { JobsService } from 'app/main/content/apps/dashboards/project/jobs.service';

@Component({
  selector: 'ml-jobcard',
  templateUrl: './jobcard.component.html',
  styleUrls: ['./jobcard.component.scss']
})
export class JobcardComponent implements OnInit {

  @Input() job: any;

  constructor(private jobcardService:JobsService,
              public dialog:MatDialog,
              private matSnackBar: MatSnackBar  
            ) { 
    
  }

  ngOnInit() {
  }

  applyForThisPosition(job){
//    console.log(job);
    let dialogRef = this.dialog.open(JobcardDialogComponent, {
      //height: '400px',
      width: '600px',
      data: job
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed, result: ' + result);
      if(result === true){
        this.matSnackBar.open("Submitted successfully!", "Info", {duration: 5000, extraClasses: ['mat-accent-900-bg']});
      }
    });
  }

}
