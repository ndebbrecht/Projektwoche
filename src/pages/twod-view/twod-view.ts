import { Component,
         ElementRef,
         Input,
         ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { CreateRoomPage } from '../../pages/create-room/create-room';

@Component({
  selector: 'page-twod-view',
  templateUrl: 'twod-view.html'
})
export class TwoDViewPage {

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


   roomCoords = [];

   addNewCorner(x, y)
   {
     roomCoords.push({x: x,y: y});
   }

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
      if(this.roomCoords.length > 0){
        this.drawRoom();
      }
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

     this._CONTEXT.moveTo(this.roomCoords[0].x, this.roomCoords[0].y);
     for(var i=1; i<this.roomCoords.length; i++)
     {
       this._CONTEXT.lineTo(this.roomCoords[i].x, this.roomCoords[i].y);
     }
     this._CONTEXT.lineTo(this.roomCoords[0].x, this.roomCoords[0].y);
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

      onClick() {
        this.navCtrl.push(CreateRoomPage);
      }

   }
