export default class Color {
  constructor (r, g, b, a) {
    if (arguments.length <=2 && typeof arguments[0] === 'number') {
      this.r = arguments[0];
      this.g = arguments[0];
      this.b = arguments[0];
      this.a = arguments[1] || 1;
    } else if (r instanceof Array) {
      this.r = r[0];
      this.g = r[1];
      this.b = r[2];
      this.a = r[3] || 1;
    } else if (r instanceof Color) {
      this.r = r.r;
      this.g = r.g;
      this.b = r.b;
      this.a = r.a;
    } else if (g === undefined) {
      this.r = r;
      this.g = r;
      this.b = r;
      this.a = 1;
    }  else {
      this.r = r;
      this.g = g ;
      this.b = b;
      this.a = a || 1;
    }

  }

  set (r, g, b, a) {
    if (arguments.length <=2 && typeof arguments[0] === 'number') {
      this.r = arguments[0];
      this.g = arguments[0];
      this.b = arguments[0];
      this.a = arguments[1] || 1;
    } else if (r instanceof Array) {
      this.r = r[0];
      this.g = r[1];
      this.b = r[2];
      this.a = r[3] || 1;
    } else if (r instanceof Color) {
      this.r = r.r;
      this.g = r.g;
      this.b = r.b;
      this.a = r.a;
    } else if (g === undefined) {
      this.r = r;
      this.g = r;
      this.b = r;
      this.a = 1;
    }  else {
      this.r = r;
      this.g = g ;
      this.b = b;
      this.a = a || 1;
    }

    return this;
  }

  get toHex () {
    let r = this.r.toString(16);
    if (this.r === 0) r = '00';
    else if (this.r > 0 && this.r < 16) r = '0' + r;
    let g = this.g.toString(16);
    if (this.g === 0) g = '00';
    else if (this.g > 0 && this.g < 16) r = '0' + g;
    let b = this.b.toString(16);
    if (this.b === 0) b = '00';
    else if (this.b > 0 && this.b < 16) r = '0' + b;
    return '#' + r + g + b;
  }

  get toRGBA () {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  shift (deg) {
    const hsla = Color.RGBAtoHSLA(this.r, this.g, this.b, this.a);
    let _deg = hsla[0] + deg;
    if (_deg < 0) _deg += 360;
    if (_deg > 360) _deg -= 360;
    hsla[0] = _deg;
    this.set(Color.HSLAtoRGBA(hsla));
    
    return this;
  }


  /**
   * final static double EPSILON = 1e-12;

    public static double map(double valueCoord1,
        double startCoord1, double endCoord1,
        double startCoord2, double endCoord2) {

        if (Math.abs(endCoord1 - startCoord1) < EPSILON) {
            throw new ArithmeticException("/ 0");
        }

        double offset = startCoord2;
        double ratio = (endCoord2 - startCoord2) / (endCoord1 - startCoord1);
        return ratio * (valueCoord1 - startCoord1) + offset;
    }
   */
  static map (value, min, max, rangeMin, rangeMax) {
    const offset = rangeMin;
    const ratio = (rangeMax - rangeMin) / (max - min);
    return ratio * (value - min) + offset;
  }

  static pickColor (min, max) { // 0° - 360°
    const h = Math.random() * 360;
    const s = Color.range(50, 100);
    const l = Color.range(50, 100);
    let c;
    if (min && max) {
      c = Color.range(min, max);
    } else {
      c = 1
    }

    return new Color(Color.HSLAtoRGBA(h, s, l, c));
  }

  static range (min, max) {
    const diff = max - min;
    return Math.random() * diff + min;
  }

  static RGBAtoHSLA (r, g, b, a) {
    let _r, _g, _b, _a;
    if (r instanceof Array) {
      _r = Color.map(r[0], 0, 255, 0, 1);
      _g = Color.map(r[1], 0, 255, 0, 1);
      _b = Color.map(r[2], 0, 255, 0, 1);
      _a = r[3];
    } else {
      _r = Color.map(r, 0, 255, 0, 1);
      _g = Color.map(g, 0, 255, 0, 1);
      _b = Color.map(b, 0, 255, 0, 1);
      _a = a;
    }
    

    const max = Math.max(_r, _g, _b);
    const min = Math.min(_r, _g, _b);

    const Chroma = max - min;
    let _h = 0;
    if (Chroma !== 0) {
      if (max === _r) {
        _h = (_g - _b) / Chroma;
      } else if (max === _g) {
        _h = (_b - _r) / Chroma + 2;
      } else if (max === _b) {
        _h = (_r - _g) / Chroma + 4;
      }
    }
    _h = _h * 60 < 0 ? _h * 60 + 360 : _h * 60;

    const Lightness = (max + min) / 2;
    let Saturation;
    if (max === 0 || min === 1) Saturation = 0;
    else Saturation = (max - Lightness) / Math.min(Lightness, 1 - Lightness)

    const h = (_h);
    const l = (Lightness * 100);
    const s = (Saturation * 100);

    return [h, s, l, _a]
  }

  static HSLAtoRGBA (h, s, l, a) {
    let _h, _s, _l, _a;
    if (h instanceof Array) {
      _h = h[0] / 60;
      _s = h[1] / 100;
      _l = h[2] / 100;
      _a = h[3];
    } else {
      _h = h / 60;
      _s = s / 100;
      _l = l / 100;
      _a = a;
    }

    if (h === 0) return [0, 0, 0, _a];
    
    const c = (1 - Math.abs(2 * _l - 1)) * _s;
    const x = c * (1 - Math.abs(_h % 2 - 1));
    let _r, _g, _b;
    if (_h >= 0 && _h <= 1) {
      _r = c;
      _g = x;
      _b = 0;
    } else if (_h >= 1 && _h <= 2) {
      _r = x;
      _g = c;
      _b = 0;
    } else if (_h >= 2 && _h <= 3) {
      _r = 0;
      _g = c;
      _b = x;
    } else if (_h >= 3 && _h <= 4) {
      _r = 0;
      _g = x;
      _b = c;
    } else if (_h >= 4 && _h <= 5) {
      _r = x;
      _g = 0;
      _b = c;
    } else if (_h >= 5 && _h <= 6) {
      _r = c;
      _g = 0;
      _b = x;
    }
    const m = _l - c / 2;

    const r = Math.round((_r + m) * 255);
    const g = Math.round((_g + m) * 255);
    const b = Math.round((_b + m) * 255);
    return [r, g, b, _a];
  }
  

}