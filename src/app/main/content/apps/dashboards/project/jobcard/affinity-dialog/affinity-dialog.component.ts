import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-affinity-dialog',
  templateUrl: './affinity-dialog.component.html',
  styleUrls: ['./affinity-dialog.component.scss']
})
export class AffinityDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AffinityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
