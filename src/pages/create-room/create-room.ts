import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomProvider } from '../../providers/room/room';
import { InfoNodeProvider } from '../../providers/info-node/info-node';
import { CreateInfoPage } from '../create-info/create-info';

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

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public room: RoomProvider, public info: InfoNodeProvider) {
  }

  roomCoords = this.room.getArray();
  infoNodes = this.info.getArray();

  addCorner()
  {
    this.room.addNewCorner(Math.round(Math.random()*1000), Math.round(Math.random()*1000), Math.round(Math.random()*1000));
  }

  deleteCorner(index){
    this.room.removeCorner(index);
  }

  deleteInfo(index) {
    this.info.removeInfo(index);
  }

  addInfo() {
    const profileModal = this.modalCtrl.create(CreateInfoPage);
    profileModal.present();
    //this.info.addInfoNode(50, 50, 50, 300, "Infopunkt", "woe, das ist echt krasse Info, du hast jetzt sehr viel gelernt!");
  }

}
