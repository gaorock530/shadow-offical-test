import React from 'react';
// import anime from 'animejs/lib/anime.es.js';
// import easeInOutCubic from 'helper/ease';
import Perlin from 'helper/perlinNoise';

const height = 600;

export default class Parallex extends React.PureComponent {
  constructor (props) {
    super (props);
    this.scrollY = window.scrollY;  
    this.layers = [];
    this.prevScroll = this.lastPos = window.scrollY;
    this.time = null;
    window.noise = new Perlin();
  }

  componentDidMount () {
    this.els = document.getElementsByClassName('parallex');

    for (let i=0;i<this.els.length;i++) {
      const el = this.els[i];
      const offset = el.dataset.offset;
      this.layers.push({el, y: 0, offset});
    }
    requestAnimationFrame(this.animate);
    window.addEventListener('wheel', this.handleWheel);
  }

  animate = () => {
    this.scrollY = window.scrollY;
    for (let el of this.layers) {
      const oldY = el.y;
      el.y = this.scrollY * el.offset;
      if (oldY !== el.y) el.el.style.transform = `translateY(${el.y}px)`;
    }
    requestAnimationFrame(this.animate);
  }

  handleWheel = (e) => {
    this.scrollY += e.deltaY * 1.5;
    if (e.deltaY > 0 && window.scrollY <= height ) {
      window.scrollTo(0, height);
    } else if (e.deltaY <= 0 && window.scrollY <= height) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, this.scrollY);
    }
  }

  


  

  render () {
    return (
      <section>
        <div className="big-photo">
          <img src="/pic/s3.png" alt="meiya" className="parallex photo-s3" data-offset="0"/>
          <img src="/pic/s2.png" alt="meiya" className="parallex photo-s2" data-offset="0.6"/>
          <img src="/pic/s1.png" alt="meiya" className="parallex photo-s1" data-offset="0.3"/>
        </div>
      </section>
    )
  }
}