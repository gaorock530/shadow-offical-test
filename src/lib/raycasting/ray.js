import { Vector } from 'lib/effect';
import Boundary from './boundary';

export default class Ray {
  constructor (pos, angle) {
    this.pos = pos instanceof Vector? pos: new Vector();
    this.dir = Vector.fromAngle(angle);
  }


  /**
   * @description cast is using line-line intersection on wiki: https://en.wikipedia.org/wiki/Line–line_intersection
   * @param {Boundary} wall a 2-point line
   */

  cast (wall) {
    if (!(wall instanceof Boundary)) return console.warn('wall Must be a [Boundary].');
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    // den is 0, means 2 lines in parallel
    if (den === 0) return;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = - ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    
    if (t > 0 && t < 1 && u > 0) {
      const x = x1 + t * (x2 - x1);
      const y = y1 + t * (y2 - y1);
      return new Vector(x, y);
    }
    return
  }
}