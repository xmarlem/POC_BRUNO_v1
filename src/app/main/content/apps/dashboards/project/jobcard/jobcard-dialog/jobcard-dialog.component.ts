import { FuseNavigationService } from './../../../../../../../core/components/navigation/navigation.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobcard-dialog',
  templateUrl: './jobcard-dialog.component.html',
  styleUrls: ['./jobcard-dialog.component.scss']
})
export class JobcardDialogComponent implements OnInit {

  snackBarRef: MatSnackBarRef<any>;

  constructor(
    public dialogRef: MatDialogRef<JobcardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private navigationService: FuseNavigationService,
    private matSnackBar: MatSnackBar,
    private router:Router
  )     
  { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(id){
    console.log(this.data);
    setTimeout(()=> {
     this.updateMailBadge(); //MLML add 1 received mail   
     //play audio
      //audio
      let audio = new Audio();
      audio.src = "assets/audio/mail.m4a";
      audio.play();

      //snack bar
      this.snackBarRef = this.matSnackBar.open("A new mail received!", 
      "Info", 
      {duration: 5000, 
       extraClasses: ['mat-light-green-900-bg']
      });

      this.snackBarRef.onAction().subscribe(
        () => {
          this.router.navigate(['apps/mail/inbox']);    
        }
      );


      const chatNavItem = this.navigationService.getNavigationItem('applications.chat');
      chatNavItem.badge.title = 6;


    }
    , 5000);
  }

  ngOnInit() {
  }


  updateMailBadge()
  {
      // Get the mail nav item
      const mailNavItem = this.navigationService.getNavigationItem('applications.mail');
  
      // Update the badge title
      mailNavItem.badge.title = 1;
      mailNavItem.badge.bg = '#09d261';
      mailNavItem.badge.fg = '#FFFFFF';
  }

}


