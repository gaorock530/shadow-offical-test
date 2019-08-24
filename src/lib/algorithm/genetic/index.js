import {Color} from 'lib/effect';

class Zen {
  constructor (canvas) {
    this.canvas = canvas;
    this.size = range(180, 200); 
    this.color = Color.pickColor(0.8, 1);
    console.log(this.color)
    // console.log('RBGA:', this.color.toRGBA);
    // console.log('Hex:', this.color.toHex)
    // console.log('Chroma:', this.color.Chroma)
    // console.log('Hue:', this.color.Hue);
    // console.log('Lightness:', this.color.Lightness);
    // console.log('Saturation:', this.color.Saturation);
    // console.log('HSLA:', Color.RGBAtoHSLA(this.color.r, this.color.g, this.color.b, this.color.a))
    // const testHsla = Color.RGBAtoHSLA([this.color.r, this.color.g, this.color.b, this.color.a]);
    // console.log('HSLA:', testHsla)
    // console.log('RGBA:', Color.HSLAtoRGBA(testHsla))
    

    this.transition = range(0, 5);  // how many layers
    this.layerStyle = [];  // ['dot', 'strap', 'gradient']

    
    this.layerColor = [];

    for (let i=0;i<this.transition;i++) {
      this.layerColor.push(Color.pickColor(0.2, 0.5))
      this.layerStyle.push('dot');
    }

    
    this.mouthSize = this.size / 10;
    this.mouthColor = Color.pickColor(0.8, 1);

    

  }

  // pickColor () {

  //   return new Color(range(10, 240),range(10, 240),range(10, 240), range(5, 10)/10);
  // }

  drawOutline () {
    this.canvas.translate(this.canvas.width /2, this.canvas.height /2);
    this.canvas.lineWeight(3);

    if (this.transition === 0) {
      this.canvas.fill(this.color);
    } else {
      this.canvas.stroke(this.color);
    }
    this.canvas.circle(0, 0, this.size);
  }

  drawMouth () {
    this.canvas.ctx.lineCap = 'round';
    this.canvas.ctx.lineJoin = 'round';
    // outer mouth
    this.canvas.lineWeight(1);
    this.canvas.stroke(this.mouthColor);
    const mouthOffsetX = 1;
    const mouthOffsetY = this.mouthSize / 2 + 5;
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(-mouthOffsetX, -mouthOffsetY);
    this.canvas.ctx.bezierCurveTo(-4, 0, -4, 0, -mouthOffsetX, mouthOffsetY)
    this.canvas.ctx.stroke()
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(mouthOffsetX, -mouthOffsetY);
    this.canvas.ctx.bezierCurveTo(4, 0, 4, 0, mouthOffsetX, mouthOffsetY)
    this.canvas.ctx.stroke()

    // inner mouth
    // this.canvas.lineWeight(2);
    this.canvas.stroke(this.mouthColor.shift(180));
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(0, -mouthOffsetY + 2);
    this.canvas.ctx.bezierCurveTo(-2, 0, -2, 0, 0, mouthOffsetY - 2)
    this.canvas.ctx.stroke()
    this.canvas.ctx.beginPath();
    this.canvas.ctx.moveTo(0, -mouthOffsetY + 2);
    this.canvas.ctx.bezierCurveTo(2, 0, 2, 0, 0, mouthOffsetY - 2);
    this.canvas.ctx.stroke()
  }

  drawLayer () {
    if (this.transition < 1) return;
    this.canvas.noFill();
    this.canvas.lineWeight(1);
    

    if (this.transition === 1) {
      const radial = this.canvas.ctx.createRadialGradient(0, 0, 10, 0, 0, this.size);
      radial.addColorStop(0, this.layerColor[0].toRGBA); 
      radial.addColorStop(1, '#555');
      this.canvas.ctx.fillStyle = radial;
      this.canvas.circle(0, 0, this.size - 5);
    }else {
      for(let i=0;i<this.transition-1;i++) {
        // this.canvas.stroke(this.layerColor[i]);
        this.canvas.noStroke();
        // const inR = 10 + i * ()
        const radial = this.canvas.ctx.createRadialGradient(0, 0, this.size - (i+1) * (this.size / this.transition), 0, 0, this.size - i * (this.size / this.transition));
        radial.addColorStop(0, this.layerColor[i].toRGBA);
        radial.addColorStop(1, this.layerColor[i+1].toRGBA);

        
        this.canvas.ctx.fillStyle = radial;
        this.canvas.circle(0, 0, this.size - 5 - i * (this.size / this.transition));
      }
    }
    
  }

  setLayerStyle (style) {

  }

}

export {Zen}


function range (min, max) {
  if (!max) return Math.floor(Math.random() * min);
  const diff = max - min;
  return Math.floor(Math.random() * diff + min);
}