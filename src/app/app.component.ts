import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'monAgence';

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyB86i9F1XDklK412fuA7_yCFMpdDmxTI1U',
      authDomain: 'monagence-6bc08.firebaseapp.com',
      databaseURL: 'https://monagence-6bc08.firebaseio.com',
      projectId: 'monagence-6bc08',
      storageBucket: 'monagence-6bc08.appspot.com',
      messagingSenderId: '973992548005',
      appId: '1:973992548005:web:eca217261b61df97e99f4c',
    };
    firebase.initializeApp(firebaseConfig);
  }
}
