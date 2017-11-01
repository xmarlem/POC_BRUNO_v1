import { TooltipPositionExample } from './../../../../../../../assets/angular-material-examples/tooltip-position/tooltip-position-example';
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
    let dialogRef:MatDialogRef<JobcardDialogComponent> = this.dialog.open(JobcardDialogComponent, {
      //height: '400px', //ho dovuto commentare perche' altrimenti mi spostava la finestra tutta a sx su mobile 
      //width: '600px',
      panelClass: 'jobcard-dialog',
      data: job
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed, result: ' + result + " Data: " + dialogRef.id);
      if(result === true){
        this.matSnackBar.open("Submitted successfully!", 
                              "Info", 
                              {duration: 5000, 
                               extraClasses: ['mat-accent-900-bg']
                              });
      }
    });
  }

}
