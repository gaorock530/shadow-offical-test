import React from 'react';
import { Vector } from 'lib/effect';
import {Wall, Particle} from 'lib/raycasting';
import Canvas from 'lib/canvas';
import BS from 'lib/algorithm/binaryTree/tree';
// import 'lib/p5';

export default class TopShow extends React.PureComponent {
  constructor (props) {
    super(props);
    this.walls = [];
  }

  componentDidMount () {

    this.canvas = new Canvas(this.screen);

    // random walls
    for (let i=0; i<10;i++) {
      const x1 = this.random(this.canvas.width);
      const x2 = this.random(this.canvas.width);
      const y1 = this.random(this.canvas.height);
      const y2 = this.random(this.canvas.height);

      this.walls[i] = new Wall(x1, y1, x2, y2);
    }
    // borders
    this.walls.push(new Wall(0, 0, 0, this.canvas.height-1));
    this.walls.push(new Wall(0, 0, this.canvas.width-1, 0));
    this.walls.push(new Wall(0, this.canvas.height-1, this.canvas.width-1, this.canvas.height-1));
    this.walls.push(new Wall(this.canvas.width-1, 0, this.canvas.width-1, this.canvas.height-1));

    // setup
    this.point = new Vector(this.canvas.width/2, this.canvas.height/2);
    this.light = new Particle(this.point);
    this.canvas.background(0);
    this.canvas.draw(this.draw, true);

    // Binary Tree test
    const tree = new BS();
    for (let i=0;i<100;i++) {
      tree.addValue(Math.floor(Math.random()*100));
    }
    // const list  = tree.traverse();
    // console.log(list)
    console.log(`Search for 8 is ${tree.search(8)? 'Found':'Not found!'}`)
  }

  draw = () => {
    // draw walls
    // this.canvas.stroke(30, 30, 30);
    // for (let wall of this.walls) {
    //   this.canvas.line(wall.a, wall.b);
    // }

    // updating mouse position every frame
    this.light.update(this.canvas.mouseX, this.canvas.mouseY);

    // draw light source
    // this.canvas.fill(0, 255, 0);
    // this.canvas.stroke(0, 255, 0);
    // this.canvas.circle(this.light.pos.x, this.light.pos.y, 5);

    
    // draw light rays
    for(let ray of this.light.rays) { 
      let record = Infinity;  // tracking distance from light source to a wall
      let closest = null;  // tracking the ray casting the closest wall point 
      let pt = null;
      

      // draw light which casting the wall
      for (let wall of this.walls) {
        pt = ray.cast(wall);
        // checking if ray is casting the wall
        if (pt) {
          wall.show();
          const d = this.light.pos.dist(pt);  // find the distance
          if (d < record) {
            // update trackers
            record = d;
            closest = pt;
          } 
        } else {
          wall.hide();
        }
      }
      // if there is a closest point then draw a ray to the wall
      if (closest) {
        this.canvas.stroke(255,255,255, 0.02);
        if (this.light.pos.dist(closest) <= 500)  {
          this.canvas.line([this.light.pos.x ,this.light.pos.y], [closest.x, closest.y]);
          this.canvas.fill(200,0,0);
          this.canvas.circle(closest.x, closest.y, 1);  // draw a circle on the wall
        } else {
          // [delete] draw small rays around light source
          this.canvas.save();
          this.canvas.translate(this.light.pos);
          this.canvas.line([0 ,0], [ray.dir.x * 500, ray.dir.y * 500]);
          this.canvas.pop();
          // [delete]
        }
        
      }
    }

    
  }


  togglePause = () => {
    this.canvas.togglePause();
  }

  random (max) {
    return Math.floor(Math.random()*max);
  }

  render () {
    return (
      <div ref={el => this.screen = el} style={wrapperStyle} onClick={this.togglePause}></div>
    )
  }
}

const wrapperStyle = {
  position: 'relative',
  width: '100%',
  height: '100vh',
  backgroundColor: '#eee',
  // cursor: 'none'
}