import * as PIXI from 'pixi.js'
import React from 'react';
import Perlin from 'helper/perlinNoise';

let dots = [];
const cols = 45;
const rows = 45;
const size = 20;

export default class Pixi extends React.PureComponent { 
  componentDidMount () {
    this.perlin = new Perlin();
    for (let y=0;y<rows;y++) {
      for (let x=0;x<cols;x++) {
        dots[x + y*cols] = {x: x*size, y: y*size};
      } 
    }


    const app = new PIXI.Application({
      width: this.view.offsetWidth,
      height: window.innerHeight,
      // resolution: window.devicePixelRatio || 1,
      backgroundColor: 0x1099bb
    });
    this.view.appendChild(app.view);
    /** add photo */
    // const bg = PIXI.Sprite.from('/pic/default.jpg');
    // bg.scale.set(app.screen.height/ bg.height)
    // // bg.scale.set(app.screen.width / bg.width)
    // bg.x = app.screen.width / 2;
    // bg.y = app.screen.height / 2;
    // bg.anchor.set(0.5);
    // app.stage.addChild(bg);
    
    const pen = new PIXI.Graphics();
    pen.lineStyle(1, 0x000000);
    pen.x = app.renderer.width / 2 - cols * size / 2;
    pen.y = app.renderer.height / 2 - rows * size / 2;
    // pen.moveTo(0, 0);
    // for (let y=0;y<rows;y++) {
    //   for (let x=0;x<cols;x++) {
    //     const dot = dots[x + y*cols];
    //     // pen.lineTo(dot.x, dot.y);
    //     pen.drawCircle(dot.x, dot.y, 1);
    //   }
    // }
    for (let y=0;y<rows;y++) {
      for (let x=0;x<cols;x++) {
        // pen.drawRect(x*size, y*size, size, size);
        // pen.drawCircle(x*size, y*size, 1);
        pen.moveTo(x*size, y*size + size);
        pen.lineTo(x*size, y*size);
        pen.lineTo(x*size + size, y*size);
        pen.lineTo(x*size, y*size + size);
        pen.lineTo(x*size + size, y*size + size);
        // pen.lineTo(x*size, y*size + size);
        
        
      } 
    }
    // for (let l=0;l<rows*cols;l++) {
    //   pen.drawCircle(dots[l].x, dots[l].y, 7);
    // }


    // pen.x = app.renderer.width / 2;
    // pen.y = app.renderer.height / 2;
    // pen.lineStyle(5, 0xFF0000);
    // pen.beginFill(0xFFEE00)
    // pen.drawCircle(0, 0, 100);
    // pen.endFill();

    // pen.lineStyle(5, 0xFF00FF);
    // pen.moveTo(400, 200);
    // pen.lineTo(600,300);

    // pen.lineStyle(5, 0xFF0000);
    // pen.beginFill(0xFFEE00)
    // pen.drawCircle(-300, -100, 100);
    // pen.endFill();

    app.stage.addChild(pen);

  }


  render () {
    return (
      <div ref={el => this.view = el} style={style}></div>
    )
  }
}

const style = {
  position: 'relative',
  height: '100vh'
}