import { FormFieldCustomControlExample } from './../../../../../../assets/angular-material-examples/form-field-custom-control/form-field-custom-control-example';
import { ContactsService } from './../../../apps/contacts/contacts.service';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ask4recommendation',
  templateUrl: './ask4recommendation.component.html',
  styleUrls: ['./ask4recommendation.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class Ask4recommendationComponent implements OnInit {

  messageCtrl: FormControl;
  contactsCtrl: FormControl;
  filteredStates: Observable<any[]>;

  filteredContacts: Observable<any[]>;


  contacts: any[];

  states: any[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<Ask4recommendationComponent>,   
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
        this.contactsCtrl.enable();        

    } );




    this.filteredContacts = this.contactsCtrl.valueChanges
    .startWith(null)
    .map( contact => contact ? this.filterContacts(contact): this.contacts.slice());



    // this.filteredStates = this.contactsCtrl.valueChanges
    //     .startWith(null)
    //     .map(state => state ? this.filterStates(state) : this.states.slice());
  }

  ngOnInit(){

    
    
  }

  // filterStates(name: string) {
  //   return this.states.filter(state =>
  //     state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  // }


  filterContacts(name: string) {
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  fillMessage(event){
    this.messageCtrl.setValue("Hi " + event.option.value + ", can you please recommend me?");
    console.log(event.option.value); 
  }


}
