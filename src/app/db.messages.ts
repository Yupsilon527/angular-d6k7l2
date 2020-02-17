import { ChangeDetectorRef, Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';
import {MediaMatcher} from '@angular/cdk/layout';
import { environment } from '../environments/environment';

export interface Message {  id: string; sender: string; message: string; }

@Component({
  selector: 'messagelist',
  templateUrl: './html/messagebox.html',
  styleUrls:['style/messagebox.css']
})
export class MessageLister   {
  mobileQuery: MediaQueryList;
  chatrooms = ["messages","example"];
  items: Observable<Message[]>;
  private _mobileQueryListener: () => void;

  constructor(public db: AngularFireDatabase/*,public auth: AngularFireAuth*/,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
     this.items = this.db.list<Message>(environment.currentChatroom, ref => ref.limitToLast(environment.nmessages)).valueChanges();

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
     
  }
  getItems()
  {
    return this.items
  }

  public formatDate(date)
  {
    var now:Date = new Date()
    var then:Date = new Date(date);

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

  changeChatroom(newname:string)
  {
    environment.currentChatroom = newname
    
    this.items = this.db.list<Message>(environment.currentChatroom, ref => ref.limitToLast(environment.nmessages)).valueChanges();
    
  }
}