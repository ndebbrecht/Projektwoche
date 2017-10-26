import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the PosArrayProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PosArrayProvider {

  constructor() {
  }

  positions : [{x:number,y:number,z:number}];

  getObject(index){
    return this.positions[index];
  }

  arrayLength(){
    return this.positions.length;
  }

  smaller(){
    this.positions.shift();
  }

  addPoint(object){
    this.positions.push(object);
  }

}
