import React from 'react';

const pics = [
  {url: 'img/2-layer1.png', offset: -0.25, x: 40, y: 70},
  {url: 'img/2-layer2.png', offset: -0.35, x: 100, y: 100},
  {url: 'img/2-layer3.png', offset: -0.45, x: 130, y: 140},
  {url: 'img/2-light.png', offset: 0.5, x: 150, y: 140},
  {url: 'img/2-mask.png', offset: 0, x: 0, y: 40, mask: true}
]; //TODO:: make script to generate this part

export default class Parallex2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.loaded = 0;
  }

  componentDidMount () {
    this.canvas = document.createElement('canvas');
    this.canvas.className = "parallex-canvas";
    this.width = this.canvas.width = 460;
    this.height = this.canvas.height = 460;
    this.ctx = this.canvas.getContext('2d');
    this.screen.appendChild(this.canvas);
    this.canvasRect = this.canvas.getBoundingClientRect();
    this.winCenter = window.innerHeight / 2;
    window.addEventListener('scroll', this.handleWheel);
    this.loadImg();
  }

  handleWheel = (e) => {
    this.canvasRect = this.canvas.getBoundingClientRect();
  }

  loadImg = () => {
    for(let pic of pics) {
      const img = new Image();
      img.src = '/pic/' + pic.url;
      img.onload = this.handleLoading;
      pic.img = img;
    }
  }

  handleLoading = () => {
    this.loaded++;
    if (this.loaded === pics.length) requestAnimationFrame(this.drawPic);
  }

  drawPic = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = '#1B323D';
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (let pic of pics) {

      var _elCenter = this.canvasRect.top + (this.height / 2);  //center of layer from document top
      var _scrollFromMiddle = _elCenter - this.winCenter;       //distance between element center and viewport center
      var _y = pic.y + (_scrollFromMiddle * pic.offset);        //multiply by offset and add base y

      if (pic.mask) {
        this.ctx.globalCompositeOperation = "destination-in";
      }

      this.ctx.drawImage(pic.img, pic.x, _y);
    }
    requestAnimationFrame(this.drawPic);
  }

  render() {
    return (
      <section ref={el => this.screen = el} className="section-canvas">
      </section>
    )
  }
}