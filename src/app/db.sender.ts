import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { auth } from 'firebase/app';
import { environment } from '../environments/environment';

export interface Message {  id: string; sender: string; message: string; }

@Component({
  selector: 'fbs',
  templateUrl: 'html/auth',
  styleUrls: [ 'style/auth.css' ]
 
})
export class FirebaseSender {
  mobile=false;
  nick =  "";
  picked_nick=false;
  items: Observable<Message[]>;
  constructor(public db: AngularFireDatabase,public auth: AngularFireAuth) {
     this.items = this.db.list<Message>(environment.currentChatroom, ref => ref.limitToLast(12)).valueChanges();
     this.mobile = environment.mobile;
  }
  /*login() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    
  }
  logout() {
    this.auth.auth.signOut();
  }
  OnDestroy()
  {
    this.logout();
  }*/
  pickNick(value: string) { 
    this.nick = value;
    console.log("nick set to "+this.nick); 
    if (value!="")
    {
      this.picked_nick=true;
    }
  }
  sendMessage(value: string){
    if (value) {
      const messages = this.db.list(environment.currentChatroom);
      messages.push({
        sender: this.nick,
        message: value,
        time: new Date().getTime()
      }).then(() => {
        
      }, (err) => {
        console.error(err);
      });
    }
  }
  sendImage(event: any) {

    console.log("sending image...")
    event.preventDefault();
    const file = event.target.files[0];

    if (!file.type.match('image.*')) {
      return;
    }
      const messages = this.db.list(environment.currentChatroom);

      messages.push({
        sender: this.nick,
        time: new Date().getTime(),
        imageUrl: 'https://www.google.com/images/spin-32.gif',
      }).then((data) => {
        const filePath = `${environment.currentChatroom}/${data.key}/${file.name}`;
        console.log("mark")
        return firebase.storage().ref(filePath).put(file)
          .then((snapshot) => {
            const fullPath = snapshot.metadata.fullPath;
            const imageUrl = firebase.storage().ref(fullPath).toString();
            return firebase.storage().refFromURL(imageUrl).getMetadata();
          }).then((metadata) => {
            return data.update({
              imageUrl: metadata.downloadURLs[0]
            });
          });
      }).then(console.log, (err) => {
        console.log("mock")
        console.error(err);
      });
    
  }
}