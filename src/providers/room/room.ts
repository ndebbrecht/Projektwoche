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

  }
  roomCoords = [];

  addNewCorner(x, y, z)
  {
    this.roomCoords.push({id: this.roomCoords.length,x: x,y: y, z: z});
  }

  getCoords(index){
    return this.roomCoords[index];
  }

  getLength(){
    return this.roomCoords.length;
  }

  getArray()
  {
    return this.roomCoords;
  }

  removeCorner(index)
  {
    this.roomCoords.splice(index, 1);
  }
}
