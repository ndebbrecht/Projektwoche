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
  building = [];

  addNewRoom(){
    this.building.push({id: this.building.length, roomCoords:Array()});
  }

  addNewCorner(roomId,x, y, z)
  {
    this.building[roomId].roomCoords.push({id: this.building[roomId].roomCoords.length,x: x,y: y, z: z});
  }

  getCoords(roomId, cornerId){
    return this.building[roomId].roomCoords[cornerId];
  }

  getLength(roomId){
    return this.building[roomId].roomCoords.length;
  }

  getArray(roomId)
  {
    return this.building[roomId].roomCoords;
  }

  removeCorner(roomId, cornerId)
  {
    this.building[roomId].roomCoords.splice(cornerId, 1);
  }

  getBuilding(){
    return this.building;
  }
}
