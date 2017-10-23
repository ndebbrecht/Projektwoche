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

<<<<<<< HEAD
   /**
     * 'plug into' DOM canvas element using @ViewChild
     */
   @ViewChild('canvas') canvasEl : ElementRef;



   /**
     * Reference Canvas object
     */
   private _CANVAS  : any;



   /**
     * Reference the context for the Canvas element
     */
   private _CONTEXT : any;


   height = 0;
   width = 0;
   constructor(public platform: Platform, public navCtrl: NavController)
   {
     platform.ready().then((readySource) => {
       this._CANVAS = this.canvasEl.nativeElement;
       this._CANVAS.width  	= platform.width();
       this._CANVAS.height 	= platform.height();
     })
   }



   /**
     * Implement functionality as soon as the template view has loaded
     *
     * @public
     * @method ionViewDidLoad
     * @return {none}
     */
   ionViewDidLoad() : void
   {
      this._CANVAS 		    = this.canvasEl.nativeElement;
      /*this._CANVAS.width  	= this.width;
      this._CANVAS.height 	= this.height;*/

      this.initialiseCanvas();
   }



   /**
     * Detect if HTML5 Canvas is supported and, if so, configure the
     * canvas element accordingly
     *
     * @public
     * @method initialiseCanvas
     * @return {none}
     */
   initialiseCanvas() : void
   {
      if(this._CANVAS.getContext)
      {
         this.setupCanvas();
      }
   }






   /**
     * Create a square using canvas drawing API
     *
     * @public
     * @method drawSquare
     * @return {none}
     */
   drawRoom() : void
   {
     this.clearCanvas();
     this._CONTEXT.beginPath();
     var tmpArray = [100, 200, 300, 100];
     this._CANVAS.moveTo(tmpArray[0], tmpArray[0]);
     for(var i=1; i<tmpArray.length; i++)
     {
       this._CANVAS.lineTo(tmpArray[0], tmpArray[0]);
     }
     this._CANVAS.lineTo(tmpArray[0], tmpArray[0]);
     this._CONTEXT.lineWidth   = 1;
     this._CONTEXT.strokeStyle = '#ffffff';
     this._CONTEXT.stroke();
=======
   onClick() {
     this.navCtrl.push(TwoDViewPage);
>>>>>>> 68e5c13b00c3e4e5d891f0fdb7f62668a0e4a1bc
   }
}
