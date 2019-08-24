import React from 'react';
import Canvas from 'lib/canvas';
import {Cell} from 'lib/algorithm/maze';

const step = 20;
const demensionWidth = 800;
const demensionHeight = 800;

const cols = step, rows = step;
const w = Math.floor(demensionWidth / cols);
const h = Math.floor(demensionHeight / rows);

export default class SecondShow extends React.PureComponent {
  constructor (props) {
    super(props);
    this.canvas = null;
    this.cells = [];
    this.stack = [];

    for (let j=0; j<cols; j++){
      for(let i=0; i<rows; i++) {
        const cell = new Cell(i, j);
        this.cells.push(cell);
      }
    }
  }


  componentDidMount() {
    // visual setup
    this.canvas = new Canvas(this.screen);
    this.canvas.background(100);
    // console.log(this.canvas.bgColor)
    const centerX = this.canvas.width / 2 - demensionWidth / 2;
    const centerY = this.canvas.height / 2 - demensionHeight / 2;
    this.canvas.translate(centerX, centerY);

    // define a start
    this.current = this.cells[0];
    
    // start draw loop
    this.canvas.draw(this.draw);

  }

  draw = () => {
    this.current.visited = true;
    // draw border
    // this.canvas.noFill();
    // this.canvas.rect(0, 0, demensionWidth, demensionHeight);
    
    for (let i=0; i<this.cells.length; i++){
      this.cells[i].show(w, h, this.canvas);
    }

    const next = this.current.checkNeighbors(this.cells, cols);

    // this.current.highlight(w, h, this.canvas);
    
    if (next) {
      // add next to stack
      this.stack.push(next);
      // remove walls
      this.current.removeWalls(next);
      // console.log(this.current, next)
      next.highlight(w, h, this.canvas);
      this.current = next;
    } else if (this.stack.length > 0) {
      this.current = this.stack.pop();
      this.current.highlight(w, h, this.canvas);
    } else {
      // for (let i=0; i<this.cells.length; i++){
      //   this.cells[i].show(w, h, this.canvas);
      // }
      this.canvas.pause()
    } 

  }

  

  render () {
    return (
      <div ref={el => this.screen = el} style={wrapperStyle}>
        <p>Maze</p><br/>
      </div>
    )
  }
}

const wrapperStyle = {
  position: 'relative',
  width: '100%',
  height: '100vh',
  backgroundColor: '#991133',
  // cursor: 'none'
}
