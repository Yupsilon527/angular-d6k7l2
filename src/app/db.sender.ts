import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
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

  user: Observable<firebase.User>;
  currentUser: firebase.User;
  userup=false;

  mobile=false;  
  profilePic: string;
  constructor(public db: AngularFireDatabase,public auth: AngularFireAuth) {

     this.mobile = environment.mobile;
     
    this.user = auth.authState;
      this.user.subscribe((user: firebase.User) => {
      console.log(user);
      this.currentUser = user;

      if (user) {
        this.profilePic=this.currentUser.photoURL;
      } else { 
        this.profilePic="https://blog.hubspot.com/hubfs/image8-2.jpg";
      }
    });
  }
  login() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.auth.signOut();
  }
  OnDestroy()
  {
    this.logout();
  }
  /*pickNick(value: string) { 
    this.nick = value;
    console.log("nick set to "+this.nick); 
    if (value!="")
    {
      this.picked_nick=true;
    }
  }*/
  sendMessage(value: string){
    if (value && this.isLoggedIn()) {
      const messages = this.db.list(environment.currentChatroom);
      messages.push({
        sender: this.currentUser.displayName,//this.nick
        message: value,
        time: new Date().getTime()
      }).then(() => {
        
      }, (err) => {
        console.error(err);
      });
    }
  } 
  
  isLoggedIn() {
    if (this.currentUser) {
      return true;
    }

    return false;
  };
}