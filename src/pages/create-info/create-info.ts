import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { InfoNodeProvider } from '../../providers/info-node/info-node';
import { PosArrayProvider } from '../../providers/pos-array/pos-array';

/**
 * Generated class for the CreateInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-info',
  templateUrl: 'create-info.html',
})
export class CreateInfoPage {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public info: InfoNodeProvider, public posArray: PosArrayProvider) {
  }

  title: String;
  desc: String;
  radius: any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateInfoPage');
  }

  addNode() {
    this.info.addInfoNode(this.posArray.getObject(this.posArray.arrayLength()-1).x,this.posArray.getObject(this.posArray.arrayLength()-1).y,this.posArray.getObject(this.posArray.arrayLength()-1).z,20,this.title,this.desc);
    console.log(this.radius);
    this.viewCtrl.dismiss();
  }

}
