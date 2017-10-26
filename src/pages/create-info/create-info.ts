import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { InfoNodeProvider } from '../../providers/info-node/info-node';

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

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public info: InfoNodeProvider) {
  }

  title: String;
  desc: String;
  radius: any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateInfoPage');
  }

  addNode() {
    this.info.addInfoNode(50,50,50,parseInt(this.radius),this.title,this.desc);
    console.log(this.radius);
    this.viewCtrl.dismiss();
  }

}
