import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PosArrayProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PosArrayProvider {

  constructor(public http: Http) {
  }

  positions : [];

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
