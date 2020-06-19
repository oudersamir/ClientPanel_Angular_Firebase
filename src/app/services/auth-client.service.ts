import { Injectable } from '@angular/core';
import {AngularFireAuth}  from 'angularfire2/auth';
import * as  firebase  from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  constructor(private afAuth: AngularFireAuth) { }

 login(email:string,password:string){
   return new Promise((resolve,reject)=>{
     this.afAuth.auth.signInWithEmailAndPassword(email,password)
     .then((userData)=>resolve(userData),(error)=>reject(error))
   })
 }

 loginWithGoogle(email:string,password:string){
  return new Promise((resolve,reject)=>{
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((userData)=>resolve(userData),(error)=>reject(error))
  })
}

 getAuth(){
   return this.afAuth.authState.pipe();
 }

 logOut(){
   this.afAuth.auth.signOut();
 }

 onRegister(email:string,password:string){
  return new Promise((resolve,reject)=>{
    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then((userData)=>resolve(userData),(error)=>reject(error))
  })
}

}
