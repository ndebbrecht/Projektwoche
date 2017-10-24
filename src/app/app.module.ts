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

import { Observable } from 'rxjs/Observable';

import {
  MqttMessage,
  MqttModule,
  MqttService
} from 'angular2-mqtt';

export const MQTT_SERVICE_OPTIONS = {
  hostname: '192.168.32.51',
  port: 1883,
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TwoDViewPage,
    CreateRoomPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TwoDViewPage,
    CreateRoomPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RoomProvider
  ]
})
export class AppModule {}
