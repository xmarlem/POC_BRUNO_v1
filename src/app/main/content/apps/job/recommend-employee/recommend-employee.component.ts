import { RatingModule } from 'ngx-rating';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContactsService } from 'app/main/content/apps/contacts/contacts.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-recommend-employee',
  templateUrl: './recommend-employee.component.html',
  styleUrls: ['./recommend-employee.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecommendEmployeeComponent implements OnInit {

  messageCtrl: FormControl;
  contactsCtrl: FormControl;

  filteredContacts: Observable<any[]>;

  starsCount: number = 0;
  
  contacts: any[];



  constructor(
    public dialogRef: MatDialogRef<RecommendEmployeeComponent>,   
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private contactsService: ContactsService 
  ) {


    this.messageCtrl = new FormControl();
    this.contactsCtrl = new FormControl();    
    this.contactsCtrl.disable();

    //first I load everything
    this.contactsService.getContacts()
    .then( (contacts) => {
        this.contacts = contacts;
//        console.log(JSON.stringify(this.contacts));
        //this.contactsCtrl.enable();        

    } );




    this.filteredContacts = this.contactsCtrl.valueChanges
    .startWith(null)
    .map( contact => contact ? this.filterContacts(contact): this.contacts.slice());

  }

  ngOnInit(){
    this.contactsCtrl.setValue("Stefan Geiser");
    this.messageCtrl.setValue("Dear Stefan, I am glad to recommend you ... ");
  }

  filterContacts(name: string) {
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  fillMessage(event){
    this.messageCtrl.setValue("Dear " + event.option.value + ", I am glad to recommend you ... ");
    //console.log(event.option.value); 
  }


  rated(){
    //console.log("rated with: "+ this.starsCount);
  }

  // ratingComponetClick(clickObj: any): void {
  //   // var item = this.items.filter((item: any) => item.id === clickObj.itemId);
  //   // if(!!item && item.length === 1){
  //   //   item[0].rating = clickObj.rating;
  //   //   this.ratingClicked = clickObj.rating;
  //   //   this.itemIdRatingClicked = clickObj.itemId;
  //   // }
    
  // }





}
