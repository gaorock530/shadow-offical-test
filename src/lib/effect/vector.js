export default class Vector {
  constructor (x, y, z) {
    if (x instanceof Vector) {
      this.x = x.x || 0;
      this.y = x.y || 0;
      this.z = x.z || 0;
    } else if (x instanceof Array) {
      this.x = this.x[0] || 0;
      this.y = this.x[1] || 0;
      this.z = this.x[2] || 0;
    }else {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    }
  }

  static fromAngle(angle, length) {
    if (typeof length === 'undefined') {
      length = 1;
    }
    return new Vector(length * Math.cos(angle), length * Math.sin(angle), 0);
  };

  static dist (v1, v2) {
    return v1.dist(v2);
  };

  add (x, y, z) {
    if (x instanceof Vector) {
      this.x += x.x || 0;
      this.y += x.y || 0;
      this.z += x.z || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x += x[0] || 0;
      this.y += x[1] || 0;
      this.z += x[2] || 0;
      return this;
    }
    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
    return this;
  }

  sub (x, y, z) {
    if (x instanceof Vector) {
      this.x -= x.x || 0;
      this.y -= x.y || 0;
      this.z -= x.z || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x -= x[0] || 0;
      this.y -= x[1] || 0;
      this.z -= x[2] || 0;
      return this;
    }
    this.x -= x || 0;
    this.y -= y || 0;
    this.z -= z || 0;
    return this;
  }

  copy () {
    return new Vector(this.x, this.y, this.z);
  }

  magSq () {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    return x * x + y * y + z * z;
  };

  mag () {
    return Math.sqrt(this.magSq());
  }

  dist (v) {
    return v.copy().sub(this).mag();
  }
}