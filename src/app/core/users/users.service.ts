import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';   
import { Observable } from 'rxjs/Observable';



//MLML
export interface User{
  _uid: string;
  email: string;
  name: string;
  surname: string;
  urlPhoto: string;
};


@Injectable()
export class UsersService {

  usersCollection: AngularFirestoreCollection<User>; 
  users: User[];        
  users$: Observable<User[]>



  constructor(
    private afs:AngularFirestore) 
    { 
        //MLML
        this.usersCollection=  this.afs.collection<User>('users');
        
        this.users$ = this.usersCollection.valueChanges();  
        this.users$.subscribe(
          data => {
            this.users = data;
            //console.log(this.users[0]);
          }
        );
                
    }

  
  getUserByEmail(email:string){ //:Promise<firebase.firestore.QuerySnapshot>{

    return this.users.find( u => u.email === email);
//    return this.usersCollection.ref.where("email", "==", email).get();
  }

}
