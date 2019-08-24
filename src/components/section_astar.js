import React from 'react';
import Canvas from 'lib/canvas';
import {Spot} from 'lib/algorithm/Astar';

const demension = 100;

const cols = demension;
const rows = demension;

const openSet = [];
const closedSet = [];
let start, end;
let w, h;
let centerX, centerY;
const makeWidth = 800;
const makeHeight = 800;
let path = [];
let count = 0;

export default class SecondShow extends React.PureComponent {
  constructor (props) {
    super(props);

    // make every Cells
    // for cols
    this.grid = new Array(cols);

    // for rows
    for(let i=0;i<cols;i++){
      this.grid[i] = new Array(rows);
    }
    // make every a Spot Object
    for(let i=0;i<cols;i++){
      for(let j=0;j<rows;j++) {
        this.grid[i][j] = new Spot(i, j);
      }
    }


    // add neighbors for every Spot
    for(let i=0;i<cols;i++){
      for(let j=0;j<rows;j++) {
        this.grid[i][j].addNeighbors(this.grid);
      }
    }


    // setup
    start = this.grid[0][0];
    end = this.grid[cols - 1][rows - 1];
    start.setWall(false);
    end.setWall(false);

    // for start
    openSet.push(start);


  }

  componentDidMount() {
    this.canvas = new Canvas(this.screen);
    this.canvas.background(100, 100, 100)
    // calculate every cell's width and height;
    w = makeWidth / cols;
    h = makeHeight / rows;

    // calculate grid X,Y offset for display center 
    centerX = this.canvas.width / 2 - makeWidth / 2;
    centerY = this.canvas.height / 2 - makeHeight / 2;

    // this.canvas.background(255,255,255);
    this.canvas.draw(this.draw);
  }

  draw = () => {
    count++;
    // make grid
    this.canvas.stroke(0);
    for (let i=0;i<cols;i++) {
      for(let j=0;j<rows;j++) {
        // this.canvas.circle(w * i + centerX + w/2, h * j + centerY + h/2, 5, true)
        // this.canvas.rect(w * i + centerX, h * j + centerY, w-1, h-1, true);
        this.canvas.fill(this.grid[i][j].color); 
        this.canvas.rect(w * i + centerX, h * j + centerY, w-1, h-1);
      }
    }

    /**
     * @description A* algorithm loop
     */

    let current;
    
    if (openSet.length > 0) {
      // keep goning
      let winner = 0;
      for (let i=0;i<openSet.length;i++) {
        if (openSet[i].f < openSet[winner].f) {
          winner = i;
        }
      }

      current = openSet[winner];


      if (current === end) {
        this.canvas.pause();
        // this.done()
        console.log('Done!', count);
      } else {

        remove(openSet, current);
        closedSet.push(current);

        const neighbors = current.neighbors;
        for (let i=0;i<neighbors.length;i++) {
          const neighbor = neighbors[i];
          if (closedSet.includes(neighbor) || neighbor.wall) continue;
          const tempG = current.g + 1;
          let betterPath = true;

          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) neighbor.g = tempG;
            else betterPath = false;
          } else {
            neighbor.g = tempG;
            openSet.push(neighbor);
          }

          if (betterPath) {
            neighbor.h = neighbor.dist(end);
            // neighbor.h = neighbor.mDist(end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.cameFrom = current;
          }
        }
      }

    } else {
      // no solution
      console.log('no Solution!', count);
      this.canvas.pause();
      // this.done()
    }


    /**
     * @description debug
     */
    for (let i=0;i<closedSet.length; i++) {
      this.canvas.fill(255,0,0); 
      this.canvas.rect(w * closedSet[i].pos.x + centerX, h * closedSet[i].pos.y + centerY, w-1, h-1);
    }

    for (let i=0;i<openSet.length; i++) {
      this.canvas.fill(0,255,0); 
      this.canvas.rect(w * openSet[i].pos.x + centerX, h * openSet[i].pos.y + centerY, w-1, h-1);
    }

    // if no solution keep path
    if (current) {
      path = [];
      let temp = current;
      path.push(temp);
      while(temp.cameFrom) {
        path.push(temp.cameFrom);
        temp = temp.cameFrom;
      }
    }
    

    for (let i=0;i < path.length; i++) {
      this.canvas.fill(10,10,255); 
      this.canvas.rect(w * path[i].pos.x + centerX, h * path[i].pos.y + centerY, w-1, h-1);
    }

    this.canvas.stroke(100,100,255);
    this.canvas.beginShape();
    for (let i=0;i < path.length; i++) {
      this.canvas.vertax(path[i].pos.x * w + centerX + w/2, path[i].pos.y * h + centerY + h/2);
    }
    this.canvas.endShape();
    
  }

  // for debuging
  done = () => {
    for (let i=0;i < path.length; i++) {
      this.canvas.fill(10,10,255); 
      this.canvas.rect(w * path[i].pos.x + centerX, h * path[i].pos.y + centerY, w-1, h-1);
    }

    this.canvas.stroke(100,100,255);
    this.canvas.beginShape();
    for (let i=0;i < path.length; i++) {
      this.canvas.vertax(path[i].pos.x * w + centerX + w/2, path[i].pos.y * h + centerY + h/2);
    }
    this.canvas.endShape();
  }

  render () {
    return (
      <div ref={el => this.screen = el} style={wrapperStyle}>

      </div>
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

function remove (arr, el) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === el) {
      arr.splice(i , 1);
      break;
    }
  }
}