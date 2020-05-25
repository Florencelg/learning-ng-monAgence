import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { resolve } from 'dns';
import { rejects } from 'assert';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((userSession) => {
        if (userSession) {
          resolve(true);
        } else {
          this.router.navigate(['/home']);
          resolve(false);
        }
      });
    });
  }
}
