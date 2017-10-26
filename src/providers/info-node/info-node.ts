import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the InfoNodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

class Node {
  y: Array<number>;
  x: Array<number>;
  z: Array<number>;
  radius: number;
  title: String;
  desc: String;
}

@Injectable()
export class InfoNodeProvider {

  info: [{
    id: number,
    x: number[],
    y: number[],
    z: number[],
    radius: number,
    title: String,
    desc: String,
  }];

  constructor() {
    this.info = [{id: 0, x: [], y: [], z:[], radius: 0, title: "", desc: ""}];
  }

  addInfoNode(x: number, y: number, z: number, radius: number, title: String, desc: String) {
    let xRange = [];
    let yRange = [];
    let zRange = [];

    for (let i = x-radius; i < x+radius; i++) {
      xRange.push(i);
    }
    for (let i = y-radius; i < y+radius; i++) {
      yRange.push(i);
    }
    for (let i = z-radius; i < z+radius; i++) {
      zRange.push(i);
    }

    console.log(this.info);
    this.info.push({
      id: this.info.length,
      x : xRange,
      y : yRange,
      z : zRange,
      radius: radius,
      title : title,
      desc : desc
    })
  }

  removeInfo(index) {
    this.info.splice(index-1, 1);
  }

  getLength() {
    return this.info.length;
  }

  getArray() {
    return this.info;
  }

}
