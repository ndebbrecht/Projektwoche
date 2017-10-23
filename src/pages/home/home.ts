import { Component,
         ElementRef,
         Input,
         ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


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
      this.drawCircle();
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
     * Create a circle using canvas drawing API
     *
     * @public
     * @method drawCircle
     * @return {none}
     */
   drawCircle() : void
   {
      this.clearCanvas();
      this._CONTEXT.beginPath();

      // x, y, radius, startAngle, endAngle
      this._CONTEXT.arc(this._CANVAS.width/2, this._CANVAS.height/2, 80, 0, 2 * Math.PI);
      this._CONTEXT.lineWidth   = 1;
      this._CONTEXT.strokeStyle = '#ffffff';
      this._CONTEXT.stroke();
   }




   /**
     * Create a square using canvas drawing API
     *
     * @public
     * @method drawSquare
     * @return {none}
     */
   drawSquare() : void
   {
      this.clearCanvas();
      this._CONTEXT.beginPath();
      this._CONTEXT.rect(this._CANVAS.width/2 - 100, this._CANVAS.height/2 - 100, 200, 200);
      this._CONTEXT.lineWidth   = 1;
      this._CONTEXT.strokeStyle = '#ffffff';
      this._CONTEXT.stroke();
   }




   /**
     * Create a triangle using canvas drawing API
     *
     * @public
     * @method drawTriangle
     * @return {none}
     */
   drawTriangle() : void
   {
      this.clearCanvas();
      this._CONTEXT.beginPath();
      this._CONTEXT.moveTo(this._CANVAS.width/2 - 100, this._CANVAS.height/2 + 100);
      this._CONTEXT.lineTo(this._CANVAS.width/2 + 100, this._CANVAS.height/2 + 100);
      this._CONTEXT.lineTo(this._CANVAS.width/2, this._CANVAS.height/2);
      this._CONTEXT.lineTo(this._CANVAS.width/2 -100, this._CANVAS.height/2 + 100);
      this._CONTEXT.lineWidth   = 1;
      this._CONTEXT.strokeStyle = '#ffffff';
      this._CONTEXT.stroke();
   }




   /**
     * Configure the Canvas element
     *
     * @public
     * @method setupCanvas
     * @return {none}
     */
   setupCanvas() : void
   {
      this._CONTEXT = this._CANVAS.getContext('2d');
      this._CONTEXT.fillStyle = "#3e3e3e";
      this._CANVAS = this.canvasEl.nativeElement;
      this._CONTEXT.fillRect(0, 0, this._CANVAS.width, this._CANVAS.height);
   }




   /**
     * Reset the Canvas element/clear previous content
     *
     * @public
     * @method clearCanvas
     * @return {none}
     */
   clearCanvas() : void
   {
      this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
      this.setupCanvas();
   }


}
