// import {Vector} from 'lib/effect';

class Cell {
  constructor (x, y) {
    // this.pos = new Vector(x, y);
    this.x = x;
    this.y = y;
    this.walls = [true, true, true, true] // top, right, bottom, left
    this.visited = false;
  }

  checkNeighbors (maze, cols) {
    const neighbors = [];
    const top = maze[Cell.index(this.x , this.y - 1, cols)];
    const right = maze[Cell.index(this.x + 1, this.y , cols)];
    const bottom = maze[Cell.index(this.x , this.y + 1, cols)];
    const left = maze[Cell.index(this.x - 1, this.y, cols)]; 

    if (top && !top.visited) neighbors.push(top);
    if (right && !right.visited) neighbors.push(right);
    if (bottom && !bottom.visited) neighbors.push(bottom);
    if (left && !left.visited) neighbors.push(left);


    if (neighbors.length > 0) {
      const next = Math.floor(Math.random() * neighbors.length);
      return neighbors[next];
    }
    return;
  }

  show (w, h, canvas) {
    canvas.stroke(255, 100, 100);
    canvas.lineWeight(2);
    // top
    if (this.walls[0]) canvas.line([this.x*w, this.y*h], [this.x*w + w, this.y*h]);
    // right
    if (this.walls[1]) canvas.line([this.x*w + w, this.y*h], [this.x*w + w, this.y*h + h]);
    // bottom
    if (this.walls[2]) canvas.line([this.x*w, this.y*h + h], [this.x*w + w, this.y*h + h]);
    // left
    if (this.walls[3]) canvas.line([this.x*w, this.y*h + h], [this.x*w, this.y*h]);

    if (this.visited) {
      // canvas.stroke(255, 100, 255);
      canvas.noStroke()
      canvas.fill(0);
      canvas.rect(this.x*w, this.y*h, w, h);
    }
    // canvas.lineWeight(0);
  }

  highlight(w, h, canvas) {
    canvas.noStroke()
    canvas.fill(100, 100, 255);
    canvas.rect(this.x*w, this.y*h, w, h);
  }

  removeWalls (next) {
    const x = this.x - next.x;
    const y = this.y - next.y;
    if (x === 1) {
      this.walls[3] = false;
      next.walls[1] = false;
    } else if (x === -1) {
      this.walls[1] = false;
      next.walls[3] = false;
    }

    if (y === 1) {
      this.walls[0] = false;
      next.walls[2] = false;
    } else if (y === -1) {
      this.walls[2] = false;
      next.walls[0] = false;
    }
  }

  static index (i, j, step) {
    if (i < 0 || j < 0 || i > step - 1 || j > step - 1) return -1; // 'step' should be cols, in this case they are equal, so use step
    return i + j * step; // step means cols;
  }
}



export {Cell}