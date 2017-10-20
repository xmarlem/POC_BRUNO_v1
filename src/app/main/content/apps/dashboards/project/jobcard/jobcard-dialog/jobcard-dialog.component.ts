import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-jobcard-dialog',
  templateUrl: './jobcard-dialog.component.html',
  styleUrls: ['./jobcard-dialog.component.scss']
})
export class JobcardDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<JobcardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)     
  { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
  }

}


