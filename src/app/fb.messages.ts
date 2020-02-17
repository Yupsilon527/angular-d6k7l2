import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';

export interface Message {  id: string; sender: string; message: string; }

@Component({
  selector: 'messagelist',
  templateUrl: './html/messagebox.html',
  styleUrls:['style/messagebox.css']
})
export class MessageLister   {
  private provider: AngularFirestore;
  private itemsCollection: AngularFirestoreCollection<Message>;
  private itemDoc: AngularFirestoreDocument<Message>;
  items: Observable<Message[]>;
  constructor(private afs: AngularFirestore) {
    
    this.provider=afs;
    this.itemsCollection = this.provider.collection("messages", ref => ref
    .orderBy('time', 'desc')
    .limit(environment.nmessages));
    this.items = this.itemsCollection.valueChanges();

  }

  public formatDate(date)
  {
    var now:Date = new Date()
    var then:Date = new Date(date.toDate());
    //console.log(then);

    if (now.getDay() == then.getDay()){
      return then.getHours()+":"+then.getMinutes();
    }
    else if (now.getDay() == then.getDay()-1){
      return "Yesterday";
    }
    else if (now.getFullYear() == then.getFullYear()){
      return then.getDay()+"."+(then.getMonth()+1);
    }

    return (then.getDay()+"."+(then.getMonth()+1)+"."+then.getFullYear())
  }

  getItems()
  {
    return this.items;
  }
}