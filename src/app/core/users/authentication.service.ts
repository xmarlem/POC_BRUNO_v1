import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersService } from './users.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthenticationService {
    
    //current user
    onCurrentUser: BehaviorSubject<any>;
    currentUser: any;
    
    //MLML

constructor(
        private afAuth:AngularFireAuth,
        private usersService:UsersService
        ) 
        { 
            this.onCurrentUser = new BehaviorSubject<any>(this.currentUser);
        }

login(email:string, password:string){
    console.log("AuthService::login called " );
    
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(
            (user) => {
                console.log("AuthService:: GOT Response from signInWithEmailAndp...setting currentUser also in localStorage " );
                //first I read from db the full information about the user
                this.currentUser = this.usersService.getUserByEmail(user.email)
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                console.log("AuthService:: firing the next event to subscribers + currentUser: " + this.currentUser);
                this.onCurrentUser.next(this.currentUser);   
            }
            
        )
}
        

// login(email:string, password:string):Promise<any>{
//     return this.afAuth.auth.signInWithEmailAndPassword(email, password);
// }

// setUser(u){
// //MLML
//         let email = u.email;
//         this.afs.firestore.collection('users').where("email", "==", email).get()
//         .then((querySnapshot) => {
//             querySnapshot.forEach( (doc) => {
//                 if (doc.exists) {
//                     console.log("Document data:", doc.data().urlPhoto);
                    
//                     this.currentUser.urlPhoto = doc.data().urlPhoto;

//                     console.log(this.currentUser);
//                 } else {
//                     console.log("No such document!");
//                 }    
//             })
//         })
//         .catch( (err) => {
//             console.log("Error getting document:", err);
//         });
//   }
logout():Promise<any> {
    localStorage.removeItem('currentUser');
    return this.afAuth.auth.signOut();
}


}
