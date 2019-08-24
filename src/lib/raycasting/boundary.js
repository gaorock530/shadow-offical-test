import {Vector} from 'lib/effect';

export default class Boundary {
  constructor (x1, y1, x2, y2) {
    this.a = new Vector(x1, y1);
    this.b = new Vector(x2, y2);
    this.visible = true;
  }

  show () {
    this.visible = true;
  }

  hide () {
    this.visible = false;
  }

}