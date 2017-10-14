import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {

  //current user
  //currentUser:firebase.User;
  

  constructor(private afAuth:AngularFireAuth) { }


  login(email:string, password:string):Promise<any>{
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // logout():Promise<any> {
  //   return this.afAuth.auth.signOut();
  // }


}
