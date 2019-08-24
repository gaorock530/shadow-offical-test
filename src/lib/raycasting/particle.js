import { Vector } from 'lib/effect';
import Ray from './ray';
import Canvas from 'lib/canvas';

export default class Particle {
  constructor (pos) {
    this.pos = pos instanceof Vector ? pos : new Vector();
    this.rays = [];

    for (let a = 0; a < 360; a += 0.2) {
      this.rays.push(new Ray(this.pos, Canvas.radians(a)));
    }
  }

  update (x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }
}