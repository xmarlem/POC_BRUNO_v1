import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

//MLMLML
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';   

//MLML
export interface User{
    email: string;
    name: string;
    surname: string;
    urlPhoto: string;
};


@Injectable()
export class AuthenticationService {

  //current user
  //currentUser:firebase.User;
  
  //MLML
  usersCollection: AngularFirestoreCollection<User>; 
  currentUser: User;        
  users: Observable<User[]>
  

  constructor(private afAuth:AngularFireAuth,
          //MLML
          private afs:AngularFirestore
        ) { 
          //MLML
          this.usersCollection=  this.afs.collection<User>('users');
          this.users = this.usersCollection.valueChanges();    
          
  //MLML
  
        }


  login(email:string, password:string):Promise<any>{
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  setUser(u){
              //MLML
              let email = u.email;
              
                        this.afs.firestore.collection('users').where("email", "==", email).get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach( (doc) => {
                                if (doc.exists) {
                                    console.log("Document data:", doc.data().urlPhoto);
                                    
                                    this.currentUser.urlPhoto = doc.data().urlPhoto;
                
                                    console.log(this.currentUser);
                                } else {
                                    console.log("No such document!");
                                }    
                            })
                        })
                        .catch( (err) => {
                            console.log("Error getting document:", err);
                        });
              
  
  }
  logout():Promise<any> {
     localStorage.removeItem('currentUser');
     return this.afAuth.auth.signOut();
  }


}
