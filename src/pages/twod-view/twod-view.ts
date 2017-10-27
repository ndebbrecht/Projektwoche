import { Component,
         ElementRef,
         Input,
         ViewChild } from '@angular/core';
import { ModalController, NavController, Platform } from 'ionic-angular';
import { CreateRoomPage } from '../../pages/create-room/create-room';
import { RoomProvider } from '../../providers/room/room';
import { PosArrayProvider } from '../../providers/pos-array/pos-array';
import { InfoNodeProvider } from '../../providers/info-node/info-node';
import { InfoModalPage } from '../../pages/info-modal/info-modal';
import { connect } from 'mqtt';

@Component({
  selector: 'page-twod-view',
  templateUrl: 'twod-view.html'
})
export class TwoDViewPage {

   @ViewChild('canvas') canvasEl : ElementRef;


   /*
    * SL Foyer
    * 1. Ecke: 15750, 3280
    * 2. Ecke: 15750, 10950
    * 3. Ecke: 0, 10950
    * 4. Ecke: 0, 0
    */

   private _CANVAS  : any;

   private _CONTEXT : any;

   coordX: number;
   coordY: number;
   coordZ: number;
   height = 0;
   width = 0;
   calcArray : [{x: number, y:number, z:number}];

   padding = 50;
   zoom = 30;
   positionHeight : number;

   constructor(public modalCtrl: ModalController, public platform: Platform, public navCtrl: NavController, public room: RoomProvider, public info: InfoNodeProvider, public posArray: PosArrayProvider)
   {
     this.calcArray = [{x:this.padding,y:this.padding,z:0}]
     platform.ready().then((readySource) => {
       this._CANVAS = this.canvasEl.nativeElement;
       this._CANVAS.width  	= platform.width();
       this._CANVAS.height 	= platform.height();
     })


     const client  = connect('mqtt://172.24.1.1:1884');
     client.on('connect', function(){
       console.log("verbunden");
       client.subscribe('outTopic');
     })

     client.on('message', (topic, message) => {
       var allCoords = message.toString();
       var coords = allCoords.split(",");
       this.coordY = ((parseInt(coords[0])/this.zoom)+this.padding);
       this.coordX = ((parseInt(coords[1])/this.zoom)+this.padding);
       this.coordZ = parseInt(coords[2]);
       if(
         this.coordX>this.padding &&
         this.coordY>this.padding &&
         this.coordX<(this.padding+(10950/this.zoom)) &&
         this.coordY<(this.padding+(15750/this.zoom))
       )
       {
          this.calcArray.push({
            x: this.coordX,
            y: this.coordY,
            z: this.coordZ
          });
       }
       if(this.calcArray.length>100){
         this.calcArray.shift();
       }
       this.drawCurrentPosition();
       if(coords.length==3 && !this.platform.is("android")){
         var filterString = "";
         var tmp = filterString.concat(((coords[0])).toString(), ",", ((coords[1])).toString(), ",", ((coords[2])).toString());
         client.publish('filterTopic', tmp);
       }
     })
     this.room.addNewCorner((15750/*4500*//this.zoom)+this.padding, /*851*/(3290/this.zoom)+this.padding, 1);
     this.room.addNewCorner((15750/*4500*//this.zoom)+this.padding, (10950/*6267*//this.zoom)+this.padding, 1);
     this.room.addNewCorner(this.padding, (10950/*6267*//this.zoom)+this.padding, 1);
     this.room.addNewCorner(this.padding, this.padding, 1);
   }

   ionViewDidLoad() : void
   {
      this._CANVAS 		    = this.canvasEl.nativeElement;

      this.initialiseCanvas();
      setInterval(() => this.renderAll(),20);
      setInterval(() => this.checkInfo(),20);

   }

   renderAll(){
     this.clearCanvas();
     if(this.room.getLength() > 0){
       this.drawRoom();
     }

     var tmpX = 0;
     var tmpY = 0;
     var tmpZ = 0;
     if(this.calcArray.length>40){
     for(var i = this.calcArray.length-1; i>this.calcArray.length-41;i--){
       tmpX += this.calcArray[i].x;
       tmpY += this.calcArray[i].y;
       tmpZ += this.calcArray[i].z;
     }
     }
     this.posArray.addPoint({x:tmpX/40, y:tmpY/40, z:tmpZ/40});
     if(this.posArray.arrayLength()>5){
       this.posArray.smaller();
     }
     this.positionHeight = this.posArray.getObject(this.posArray.arrayLength()-1).z;
     this.drawCurrentPosition();
     this.drawInfo();
   }

   visibleNodes = [];
   infoVisible = false;

   checkInfo() {
     for (let i = 0; i < this.info.getLength(); i++) {
       if(this.info.info[i].x.indexOf(this.posArray.getObject(this.posArray.arrayLength()-1).x) > -1 && this.info.info[i].y.indexOf(this.posArray.getObject(this.posArray.arrayLength()-1).y) > -1 ) {
         this.infoVisible = true;
         if (this.visibleNodes.indexOf(this.info.info[i]) == -1) {
           this.visibleNodes.push(this.info.info[i]);
         }
       }
       else {
         this.infoVisible = false;
         this.visibleNodes = [];
       }
     }
     console.log(this.visibleNodes);
   }

   initialiseCanvas() : void
   {
      if(this._CANVAS.getContext)
      {
         this.setupCanvas();
      }
   }

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

      setupCanvas() : void
      {
         this._CONTEXT = this._CANVAS.getContext('2d');
         this._CONTEXT.fillStyle = "#3e3e3e";
         this._CONTEXT.fillRect(0, 0, this._CANVAS.width, this._CANVAS.height);
      }

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
        this._CONTEXT.arc(this.posArray.getObject(this.posArray.arrayLength()-1).x, this.posArray.getObject(this.posArray.arrayLength()-1).y, 10, 0, 2 * Math.PI);
        this._CONTEXT.lineWidth   = 2;
        this._CONTEXT.strokeStyle = '#ffffff';
        this._CONTEXT.stroke();
      }

      drawInfo() {

        for (let i = 0; i < this.info.getLength(); i++) {
          this._CONTEXT.beginPath();
          this._CONTEXT.rect(this.info.info[i].x[0], this.info.info[i].y[0], this.info.info[i].x[this.info.info[i].x.length-1]-this.info.info[i].x[0], this.info.info[i].y[this.info.info[i].y.length-1]-this.info.info[i].y[0])
          this._CONTEXT.lineWidth   = 2;
          this._CONTEXT.strokeStyle = '#ffffff';
          this._CONTEXT.stroke();
        }
      }

      showInfo() {
        const profileModal = this.modalCtrl.create(InfoModalPage, { infoNodes: this.visibleNodes });
        profileModal.present();
      }

   }
