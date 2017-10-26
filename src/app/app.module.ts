import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TwoDViewPage } from '../pages/twod-view/twod-view';
import { CreateRoomPage } from '../pages/create-room/create-room';
import { RoomProvider } from '../providers/room/room';
import { InfoNodeProvider } from '../providers/info-node/info-node';
import { CreateInfoPage } from '../pages/create-info/create-info';
import { InfoModalPage } from '../pages/info-modal/info-modal';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TwoDViewPage,
    CreateRoomPage,
    CreateInfoPage,
    InfoModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TwoDViewPage,
    CreateRoomPage,
    CreateInfoPage,
    InfoModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RoomProvider,
    InfoNodeProvider
  ]
})
export class AppModule {}
