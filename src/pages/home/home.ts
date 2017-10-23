import { Component,
         ElementRef,
         Input,
         ViewChild } from '@angular/core';
import { NavController} from 'ionic-angular';
import { TwoDViewPage } from '../../pages/twod-view/twod-view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   constructor(public navCtrl: NavController) {}

   onClick() {
     this.navCtrl.push(TwoDViewPage);
   }
}
