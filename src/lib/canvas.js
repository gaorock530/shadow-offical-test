import {Color, Vector} from 'lib/effect';

const DEG_TO_RAD = 0.017453292519943295;
const RAD_TO_DEG = 57.29577951308232;

export default class Canvas {
  constructor (canvas, fallbackImageUrl) {
    if (!canvas || !(canvas instanceof HTMLElement)) {
      return console.warn('\'HTMLElement\' must be provided in Canvas Class!');
    } 
    this.wrapper = canvas;
    this.fallbackImageUrl = fallbackImageUrl || '';

    if (canvas.tagName === 'CANVAS') {
      this.canvas = canvas;
    } else {
      this.canvas = document.createElement('canvas');
      this.canvas.width = canvas.offsetWidth;
      this.canvas.height = canvas.offsetHeight;
      canvas.appendChild(this.canvas);
    }

    if (!this.Support) {
      // canvas fallback to image
      const img  = document.createElement('img');
      img.src = this.fallbackImageUrl || '';
      this.canvas.appendChild(img);
    }

    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.bgColor = null;
    this.paused = false;
    this.saved = false; // tracking save state
    this.tracker = null;  // requestAnimationFrame tracker
    this.animate = null;  // keep all animations
    this.mouseX = 0;
    this.mouseY = 0;

    this.canvas.addEventListener('mousemove', this.trackMouse);
    window.addEventListener('resize', this.reset);
  }

  static radians (angle) {
    return angle * DEG_TO_RAD;
  };

  static degrees (angle) {
    return angle * RAD_TO_DEG;
  };

  get Support () {
    return this.canvas.getContext;
  }

  /**
   * Setup
   */

  reset () {
    // this.canvas.width = this.wrapper.innerWidth;
    // this.canvas.height = this.wrapper.innerHeight;
    // this.width = this.canvas.width;
    // this.height = this.canvas.height;
  }
  
  /**
   * Utils 
   */

  background (r, g, b, a) {
    if (!this.bgColor) this.bgColor = new Color(r, g, b, a);
    this.ctx.fillStyle = `rgba(${this.bgColor.r}, ${this.bgColor.g}, ${this.bgColor.b}, ${this.bgColor.a})`;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
  
  lineWeight (width) {
    this.ctx.lineWidth = width;
  }

  fill (r, g, b, a) {
    if (r instanceof Color) {
      this.ctx.fillStyle = `rgba(${r.r}, ${r.g}, ${r.b}, ${r.a})`;
    }else {
      const color = new Color(r, g, b, a);
      this.ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    }
 
  }
  noFill () {
    this.ctx.fillStyle = `rgba(0,0,0,0)`;
  }

  stroke (r, g, b, a) {
    if (r instanceof Color) {
      this.ctx.strokeStyle = `rgba(${r.r}, ${r.g}, ${r.b}, ${r.a})`;
    }else {
      const color = new Color(r, g, b, a);
      this.ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    } 
  }

  noStroke () {
    this.ctx.strokeStyle = `rgba(0,0,0,0)`;
  }

  rect (x, y, width, height) {    
    this.ctx.fillRect(x, y, width, height);
    this.ctx.strokeRect(x, y, width, height);
  }

  line (a, b) {
    const pointA = {};
    const pointB = {};
    if (a instanceof Vector) {
      pointA.x = a.x;
      pointA.y = a.y;
    } else if (a instanceof Array) {
      pointA.x = a[0];
      pointA.y = a[1];
    } 
    if (b instanceof Vector) {
      pointB.x = b.x;
      pointB.y = b.y;
    } else if (b instanceof Array) {
      pointB.x = b[0];
      pointB.y = b[1];
    } 

    this.ctx.beginPath();
    this.ctx.moveTo(pointA.x, pointA.y);
    this.ctx.lineTo(pointB.x, pointB.y);
    // this.ctx.closePath()
    
    this.ctx.stroke();
  }

  beginShape () {
    this.ctx.beginPath();
  }

  vertax (x, y) {
    if (!this.shapeStart) {
      this.ctx.moveTo(x, y);
      this.shapeStart = true;
    } else {
      this.ctx.lineTo(x, y);
    }
  }

  endShape () {
    this.shapeStart = false;
    // this.ctx.closePath();
    this.ctx.stroke();
  }

  circle (x, y, radius = 1) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI*2);
    this.ctx.fill();
    this.ctx.stroke();
  }

  translate (x, y) {
    if (x instanceof Vector) {
      this.ctx.translate(x.x, x.y);
    } else if (x instanceof Array) {
      this.ctx.translate(x[0], x[1]);
    } else {
      this.ctx.translate(x, y);
    }
  }

  save () {
    this.ctx.save();
    this.saved = true;
  }

  pop () {
    this.ctx.restore();
    this.saved = false;
  }

  loop = () => {
    if (!this.animate) return;
    if (this.paused) {
      cancelAnimationFrame(this.tracker);
      this.tracker = null;
      return;
    }
    if (this.bgColor) this.background();  // reDraw backgound
    else this.ctx.clearRect(0, 0, this.width, this.height); // clear canvas
    this.animate();
    this.tracker = requestAnimationFrame(this.loop);
  }

  draw (fn, noloop) { 
    this.paused = noloop;
    this.animate = fn;
    if (noloop) return this.animate();
    this.tracker = requestAnimationFrame(this.loop);
  }

  pause () {
    this.paused = true;
  }

  togglePause () {
    this.paused = !this.paused;
    if (!this.paused) this.tracker = requestAnimationFrame(this.loop);
  }

  // => keep 'this'
  trackMouse = (e) => {
    this.mouseX = e.offsetX;
    this.mouseY = e.offsetY;
  }

  destory () {
    if (this.tracker) cancelAnimationFrame(this.tracker);
    this.tracker = null;
    this.canvas.removeEventListener('mousemove', this.trackMouse);
    window.removeEventListener('resize', this.reset);
  }
} 

