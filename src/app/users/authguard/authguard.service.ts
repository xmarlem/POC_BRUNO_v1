import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthGuard implements CanActivate {

  //current user
  currentUser:firebase.User;


  constructor(private router:Router,
              private afAuth:AngularFireAuth) { }

  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    console.log(route);

    if(!this.currentUser){
      this.router.navigate(['/pages/auth/login-2']);
      return false;    
    }
    else
      return true;

  }

  login(email:string, password:string){
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("login ok!"+ user);
        this.currentUser = user;
        this.router.navigate(['']);
      } )
      .catch((err) => console.log(err));    
  }

}
