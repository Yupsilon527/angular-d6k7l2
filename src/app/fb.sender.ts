import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
export interface Message {  sender: string; message: string; time;Date }

@Component({
  selector: 'fbs',
  templateUrl: 'html/auth',
  styleUrls: [ 'style/auth.css' ]
 
})
export class FirebaseSender {
  mobile=false;
  nick =  "";
  picked_nick=false;
  private itemsCollection: AngularFirestoreCollection<Message>;
  constructor(private readonly afs: AngularFirestore)  { 
    this.itemsCollection = afs.collection<Message>('messages');
     this.mobile = environment.mobile;
  }
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
      const id = this.afs.createId();
      const item:Message = { sender: this.nick, message:value, time:new Date() };
      this.itemsCollection.doc(id).set(item);
    }
  }
}