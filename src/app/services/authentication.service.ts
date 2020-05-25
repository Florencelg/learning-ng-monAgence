import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}
  // Méthod de creation auth:
  // signUpUser(email: string, password: string) {
  //   return new Promise((resolve, reject) => {
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, password)
  //       .then(() => {
  //         console.log('Connecté');
  //         resolve();
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // }

  // Méthod authentification via Firebase:
  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Méthod de déconnexion via Firebase:
  signOutUser() {
    firebase.auth().signOut();
  }
}
