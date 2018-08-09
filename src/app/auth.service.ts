import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { map } from '../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  user: Observable<firebase.User>;
  authToken: any;
  constructor(public fireAuth: AngularFireAuth) {
    this.user = fireAuth.authState;
  }

  canActivate(): Observable<boolean> {
    return this.fireAuth.authState.pipe(map(user => user !== null));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loginWithGoogle() {

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      // In memory persistence will be applied to the signed in Google user
      // even though the persistence was set to 'none' and a page redirect
      // occurred.
      return firebase.auth().signInWithPopup(provider);
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  }

  loginWithFB() {

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
      const provider = new firebase.auth.FacebookAuthProvider();
      // In memory persistence will be applied to the signed in facebook user
      // even though the persistence was set to 'none' and a page redirect
      // occurred.
      return firebase.auth().signInWithPopup(provider);
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  loginWithGHub() {

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
      const provider = new firebase.auth.GithubAuthProvider();
      // In memory persistence will be applied to the signed in github user
      // even though the persistence was set to 'none' and a page redirect
      // occurred.
      return firebase.auth().signInWithPopup(provider);
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  onAuthChanged() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        const userObj = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          uid: user.uid,
          providerData: user.providerData
        };
       return(userObj);
        // ...
      } else {
        // User is signed out.
        //
        console.log('You are signed out!');
      }
    });
  }

  signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
  }



  logout() {
    this.fireAuth.auth.signOut();
  }
}
