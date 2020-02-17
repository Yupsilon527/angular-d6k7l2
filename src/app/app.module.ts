import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { DeviceDetectorModule } from 'ngx-device-detector';
import {  AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
//import { FirebaseSender } from './fb.sender';
//import { MessageLister } from './fb.messages';
import { FirebaseSender } from './db.sender';
import { MessageLister } from './db.messages';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    DeviceDetectorModule.forRoot(),
    AngularFireAuthModule,

    BrowserAnimationsModule,
    MatDividerModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    ],
  declarations: [ AppComponent, MessageLister, FirebaseSender ],
  bootstrap:    [ AppComponent ],
  providers:    [ AngularFireAuth, AngularFireDatabaseModule ]
})
export class AppModule { }
