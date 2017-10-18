import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersService } from './users.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    
//current user
onCurrentUser: BehaviorSubject<any>;
onCurrentUserValidationErrors: BehaviorSubject<any>;
currentUser: any;
    
    
//MLML
constructor(
        private afAuth:AngularFireAuth,
        private usersService:UsersService
        ) 
        { 
            this.onCurrentUser = new BehaviorSubject<any>(this.currentUser);
            this.onCurrentUserValidationErrors = new BehaviorSubject<any>("");
            //if the user is already logged in (already stored in localStorage) i load it.
            this.loadCurrentUser();
        }

/** no longer used */
login(email:string, password:string){
    //console.log("AuthService::login called " );
    
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(
            (user) => {
                //console.log("AuthService:: GOT Response from signInWithEmailAndp...setting currentUser also in localStorage " );
                //first I read from db the full information about the user
                this.currentUser = this.usersService.getUserByEmail(user.email)
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                //console.log("AuthService:: firing the next event to subscribers + currentUser: " + this.currentUser);
                //this.onCurrentUser.next(this.currentUser);   
            }
            
        )
        .catch(
            (err) => {
                this.onCurrentUserValidationErrors.next(err);
            }
        )
}
        
login2(email:string, password:string):Observable<any>{
    //console.log("AuthService::login called " );
    
    return Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password))
        .map( user => {
            //console.log("AuthService:: GOT Response from signInWithEmailAndp...setting currentUser also in localStorage " );
            //first I read from db the full information about the user
            this.currentUser = this.usersService.getUserByEmail(user.email)
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            //console.log("AuthService:: firing the next event to subscribers + currentUser: " + this.currentUser.role);
            return this.currentUser;
        } );
}



loadCurrentUser(){
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if(user){
        this.currentUser = user;
    }
}


logout():Promise<any> {
    localStorage.removeItem('currentUser');
    return this.afAuth.auth.signOut();
}


}
