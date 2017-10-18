
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';   
import { Observable } from 'rxjs/Observable';


/**
 *  Responsibility: load the list of users and provide facilities like getUserByEmail
 * it is called by the AuthenticationService to recover details about the users
 */


//MLML
export interface User{
  _uid: string;
  email: string;
  name: string;
  surname: string;
  urlPhoto: string;
  role: string;
};


@Injectable()
export class UsersService {
  //firestore collection to keep the user list
  usersCollection: AngularFirestoreCollection<User>; 
  users: User[];        
  //
  users$: Observable<User[]>


  //this service loads the list of users directly at creation time (in the constructor)
  constructor(
    private afs:AngularFirestore) 
    { 
        //MLML
        this.usersCollection=  this.afs.collection<User>('users');
        
        this.users$ = this.usersCollection.valueChanges();  
        //I subscribe my self to get the users once received the response from the firebase api
        this.users$.subscribe(
          data => {
            this.users = data;
            //console.log(this.users[0]);
          }
        );
                
    }

  /** Required to get a user by email. The user is looked up directly in the user array */
  getUserByEmail(email:string){ //:Promise<firebase.firestore.QuerySnapshot>{
    return this.users.find( u => u.email === email);
  }

}
