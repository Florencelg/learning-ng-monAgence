import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from '../interfaces/property';
import * as firebase from 'firebase';
import { resolve } from 'dns';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  properties: Property[] = [];

  propertiesSubject = new Subject<Property[]>();

  constructor() {}

  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  // Pour Sauvegarder les données dans la base de données de firebase:
  saveProperties() {
    firebase.database().ref('/properties').set(this.properties);
  }

  getProperties() {
    // Méthode avec les promises:
    // return new Promise((resolve, reject) => {
    //   if (this.properties && this.properties.length > 0) {
    //     resolve(this.properties);
    //   } else {
    //     const error = new Error('Properties does not exist or is empty');
    //     reject(error);
    //   }
    // });
    // Méthode Observable:
    // return new Observable((observer) => {
    //   if (this.properties && this.properties.length > 0) {
    //     observer.next(this.properties);
    //     observer.complete();
    //   } else {
    //     const error = new Error('Properties does not exist or is empty');
    //     observer.error(error);
    //   }
    // });

    // Pour récupérer les données dans le stockage tampon, properties: Property[] = [];:
    firebase
      .database()
      .ref('/properties')
      .on('value', (data) => {
        this.properties = data.val() ? data.val() : [];
        this.emitProperties();
      });
  }

  getSingleProperties(id) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('/properties/' + id)
        .once('value')
        .then((data) => {
          resolve(data.val());
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  createProperty(property: Property) {
    this.properties.push(property);
    // Ensuite faut Sauvegarder dans Firebase:
    this.saveProperties();
    this.emitProperties();
  }

  deleteProperty(index) {
    this.properties.splice(index, 1);
    this.saveProperties();
    this.emitProperties();
  }

  updateProperty(property: Property, index) {
    // this.properties[index] = property;
    // this.saveProperties();
    // this.emitProperties();

    // Autre method en interrogeant firebase:
    firebase
      .database()
      .ref('/properties/' + index)
      .update(property)
      .catch((error) => {
        console.log(error);
      });
  }

  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const uniquId = Date.now().toString();
      const fileName = uniquId + file.name;
      const upload = firebase
        .storage()
        .ref()
        .child('images/properties/' + uniquId + fileName)
        .put(file);
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('chargement...');
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        () => {
          upload.snapshot.ref.getDownloadURL().then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  }
  removeFile(fileLink: string) {
    if (fileLink) {
      const storageRef = firebase.storage().refFromURL(fileLink);
      storageRef
        .delete()
        .then(() => {
          console.log('file deleted');
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().refFromURL(fileLink);
      storageRef.delete().then(() => {
        console.log('file deleted');
        resolve();
      });
    });
  }
}
