import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomProvider } from '../../providers/room/room';

/**
 * Generated class for the CreateRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-room',
  templateUrl: 'create-room.html',
})
export class CreateRoomPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public room: RoomProvider) {
  }

  roomCoords = this.room.getArray();

  addCorner()
  {
    this.room.addNewCorner(Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000));
  }

  deleteCorner(index){
    this.room.removeCorner(index);
  }

}
