import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';

import { AuthProvider } from '../providers/auth/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { DashPage } from '../pages/dash/dash';
import { CreatePage } from '../pages/create/create';
import { SettingPage } from '../pages/setting/setting';
import { TabsPage } from '../pages/tabs/tabs';

const config = {
  apiKey: "AIzaSyDG6cYAeNJfPA1fC7QRqipQ-RrD1BqmBNk",
  authDomain: "geofamily-174514.firebaseapp.com",
  databaseURL: "https://geofamily-174514.firebaseio.com",
  projectId: "geofamily-174514",
  storageBucket: "geofamily-174514.appspot.com",
  messagingSenderId: "951513238971"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    DashPage,
    CreatePage,
    SettingPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    DashPage,
    CreatePage,
    SettingPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    Camera,
    AngularFireDatabase
  ]
})
export class AppModule {}
