import { PostPage } from './../pages/post/post';
import { CreateAccountPage } from './../pages/create-account/create-account';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

const firebaseConfig = { 
  apiKey: "AIzaSyCN81R376HoBgzICkO42J54w-X73RreKAQ",
  authDomain: "tdc-mobile.firebaseapp.com",
  databaseURL: "https://tdc-mobile.firebaseio.com",
  projectId: "tdc-mobile",
  storageBucket: "tdc-mobile.appspot.com",
  messagingSenderId: "833945671185"
}

import { Firebase } from '@ionic-native/firebase';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';

import { ComponentsModule } from '../components/components.module'
import { DatabaseProvider } from '../providers/database/database';
import { FcmProvider } from '../providers/fcm/fcm';
import { AnalyticsProvider } from '../providers/analytics/analytics';
import { RemoteConfigProvider } from '../providers/remote-config/remote-config';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    CreateAccountPage,
    PostPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    CreateAccountPage,
    PostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Firebase,
    Facebook,
    DatabaseProvider,
    Camera,
    FcmProvider,
    AnalyticsProvider,
    RemoteConfigProvider,
    Device
  ]
})
export class AppModule {}
