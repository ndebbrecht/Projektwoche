import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the InfoModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-modal',
  templateUrl: 'info-modal.html',
})
export class InfoModalPage {

  infoNodes: any[];

  constructor(public viewCtrl: ViewController, params: NavParams, public navCtrl: NavController, public navParams: NavParams) {
    this.infoNodes = params.get('infoNodes');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoModalPage');
  }

  back() {
    this.viewCtrl.dismiss();
  }

}
