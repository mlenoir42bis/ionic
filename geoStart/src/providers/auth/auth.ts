import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { usercreds } from '../../models/interfaces/usercreds';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afireauth: AngularFireAuth) {
  }

     login(credentials: usercreds) {
       var promise = new Promise((resolve, reject) => {

        if (typeof credentials.email !== "undefined" && typeof credentials.password !== "undefined" && credentials.email != "" && credentials.password != "") {
          this.afireauth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
            resolve(true);
          }).catch((err) => {
            resolve(err);
          })
        }

       })
    
       return promise;
       
     }
     
     resetPassword(email: string) {
      var promise = new Promise((resolve, reject) => {

       if (typeof email !== "undefined" && email != "") {
         this.afireauth.auth.sendPasswordResetEmail(email).then(() => {
           resolve(true);
         }).catch((err) => {
           resolve(err);
         })
       }

      })
   
      return promise;
      
    }
    
    signup(credentials: usercreds) {
      var promise = new Promise((resolve, reject) => {

       if (typeof credentials.email !== "undefined" && typeof credentials.password !== "undefined" && credentials.email != "" && credentials.password != "") {
         this.afireauth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(() => {
           resolve(true);
         }).catch((err) => {
           resolve(err);
         })
       }

      })
   
      return promise;
      
    }
    

}
