import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import * as firebase from "firebase/app";

import { Observable } from "rxjs/Observable";
import { switchMap, first } from "rxjs/operators";

import { Facebook } from "@ionic-native/facebook";

import * as Chance from "chance";

@Injectable()
export class AuthProvider {
  user: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private facebook: Facebook,
    private platform: Platform
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      })
    );
  }

  //// FACEBOOK ////

  async facebookLogin() {
    if (this.platform.is("cordova")) {
      return await this.nativeFacebookLogin();
    } else {
      return await this.webFacebookLogin();
    }
  }

  async nativeFacebookLogin(): Promise<void> {
    try {
      const response = await this.facebook.login(["email", "public_profile"]);
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
        response.authResponse.accessToken
      );

      const firebaseUser = await firebase
        .auth()
        .signInWithCredential(facebookCredential);

      return await this.updateUserData(firebaseUser);
    } catch (err) {
      console.log(err);
    }
  }

  async webFacebookLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);

      return await this.updateUserData(credential.user);
    } catch (err) {
      console.log(err);
    }
  }

  // Save custom user data in Firestore
  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || new Chance().name({ prefix: true }),
      photoURL: user.photoURL || "https://goo.gl/7kz9qG"
    };
    return userRef.set(data, { merge: true });
  }
  //// GOOGLE LOG IN ////

  async signInWithGoogle() {
    console.log("Sign in with google");
    const credential = await this.oauthSignIn(
      new firebase.auth.GoogleAuthProvider()
    );
    return await this.updateUserData(credential.user);
  }

  private async oauthSignIn(provider: firebase.auth.AuthProvider) {
    if (!(<any>window).cordova) {
      return await this.afAuth.auth.signInWithPopup(provider);
    } else {
      return await this.afAuth.auth.signInWithRedirect(provider).then(() => {
        return this.afAuth.auth
          .getRedirectResult()
          .then(result => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            console.log(token, user);
          })
          .catch(function(error) {
            // Handle Errors here.
            alert(error.message);
          });
      });
    }
  }

  //// ANONYMOUS ////

  async anonymousLogin(): Promise<void> {
    const user = await this.afAuth.auth.signInAnonymously();
    await this.updateUserData(user);
  }

  async signInWithEmail(credentials): Promise<void> {
    console.log("Sign in with email");
    await this.afAuth.auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  //// SIGN UP ////

  async signUp(credentials): Promise<void> {
    const signupResult = await this.afAuth.auth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
    await this.updateUserData(signupResult);
  }

  //// HELPERS ////

  async changePassword(newPass: string): Promise<any> {
    return await this.afAuth.auth.currentUser.updatePassword(newPass);
  }

  async logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  // Current user as a Promise. Useful for one-off operations.
  async getCurrentUser(): Promise<any> {
    return this.user.pipe(first()).toPromise();
  }

  // Current user as boolean Promise. Used in router guards
  async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
}
