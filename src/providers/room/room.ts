import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the RoomProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoomProvider {

  constructor() {
    console.log('Hello RoomProvider Provider');
  }
  roomCoords = [];

  addNewCorner(x, y)
  {
    this.roomCoords.push({x: x,y: y});
  }

  getCoords(index){
    return this.roomCoords[index];
  }

  getLength(){
    return this.roomCoords.length;
  }
}
