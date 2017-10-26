import { Component,
         ElementRef,
         Input,
         ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { CreateRoomPage } from '../../pages/create-room/create-room';
import { RoomProvider } from '../../providers/room/room';
import { connect } from 'mqtt';

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


   coordX: number;
   coordY: number;
   coordZ: number;
   height = 0;
   width = 0;
   posArray : [{x: number, y:number, z:number}];

   constructor(public platform: Platform, public navCtrl: NavController, public room: RoomProvider)
   {
     this.posArray = [{x:0,y:0,z:0}];
     platform.ready().then((readySource) => {
       this._CANVAS = this.canvasEl.nativeElement;
       this._CANVAS.width  	= platform.width();
       this._CANVAS.height 	= platform.height();
     })


     const client  = connect('mqtt://192.168.32.51:1884');
     client.on('connect', function(){
       console.log("verbunden");
       client.subscribe('outTopic');
     })

     client.on('message', (topic, message) => {
       var allCoords = message.toString();
       var coords = allCoords.split(",");
       this.coordX = (parseInt(coords[0])/30)+(platform.height());
       this.coordY = (parseInt(coords[1])/30)+(platform.width());
       this.coordZ = (parseInt(coords[2])/30);
       this.posArray.push({
         x: this.coordX,
         y: this.coordY,
         z: this.coordZ
       });
       console.log(this.posArray);
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
      setInterval(() => this.renderAll(),20);

   }

   renderAll(){
     this.clearCanvas();
     if(this.room.getLength() > 0){
       this.drawRoom();
     };
     //this.posArray.push({x: parseInt(this.coordX), y: parseInt(this.coordY), z: parseInt(this.coordZ)});

     this.drawCurrentPosition();
     this.drawPath();
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
     this._CONTEXT.beginPath();

     this._CONTEXT.moveTo(this.room.getCoords(0).x, this.room.getCoords(0).y);
     for(var i=1; i<this.room.getLength(); i++)
     {
       this._CONTEXT.lineTo(this.room.getCoords(i).x, this.room.getCoords(i).y);
     }
     this._CONTEXT.lineTo(this.room.getCoords(0).x, this.room.getCoords(0).y);
     this._CONTEXT.lineWidth   = 5;
     this._CONTEXT.strokeStyle = '#ffffff';
     this._CONTEXT.setLineDash([]);
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

      switchToCreateRoom() {
        this.navCtrl.push(CreateRoomPage);
      }


      drawCurrentPosition() : void
      {
        this._CONTEXT.beginPath();

        // x, y, radius, startAngle, endAngle
        this._CONTEXT.arc(this.posArray[this.posArray.length-1], this.posArray[this.posArray.length-1], 5, 0, 2 * Math.PI);
        this._CONTEXT.lineWidth   = 2;
        this._CONTEXT.strokeStyle = '#ffffff';
        this._CONTEXT.stroke();
      }

      drawPath() : void
      {
        this._CONTEXT.beginPath();
        this._CONTEXT.moveTo(this.posArray[this.posArray.length-1], this.posArray[this.posArray.length-1]);
        for(var i = this.posArray.length-1; i>=this.posArray.length-11; i--)
        {
          if(i>=0){
            this._CONTEXT.lineTo(this.posArray[i].x, this.posArray[i].y);
          }
        }
        this._CONTEXT.lineWidth = 3;
        this._CONTEXT.strokeStyle = '#00ff7f';
        this._CONTEXT.setLineDash([25, 5]);
        this._CONTEXT.stroke();
      }

   }
