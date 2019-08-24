import {Vector, Color} from 'lib/effect';

export default class Spot {
  constructor (x, y, color) {
    this.pos = new Vector(x, y);

    this.f = 0;
    this.g = 0;
    this.h = 0; // heuristics
    
    this.neighbors = [];
    this.cameFrom = null;
    this.wall = Math.random() < 0.5;
    this.color = new Color(this.wall? 0 : 255);
  }

  setWall (wall) {
    this.wall = wall;
    this.color = new Color(this.wall? 0 : 255);
  }

  addNeighbors (grid) {
    const i = this.pos.x;
    const j = this.pos.y;
    const cols = grid.length;
    const rows = grid[0].length;

    // crossd neighbors
    if (i < cols - 1) this.neighbors.push(grid[i + 1][j]);
    if (i > 0) this.neighbors.push(grid[i - 1][j]);
    if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
    if (j > 0) this.neighbors.push(grid[i][j - 1]);

    // angled neighbors
    if (i > 0 && j > 0) this.neighbors.push(grid[i - 1][j - 1]);
    if (i < cols - 1 && j > 0) this.neighbors.push(grid[i + 1][j - 1]);
    if (i > 0 && j < rows - 1) this.neighbors.push(grid[i - 1][j + 1]);
    if (i < cols - 1 && j < rows - 1) this.neighbors.push(grid[i + 1][j + 1]);

  }

  // calculate Heuristics
  dist (end) {
    return this.pos.dist(end.pos);
  }

  mDist (end) {
    return Math.abs(this.pos.x - end.pos.x) + Math.abs(this.pos.y - end.pos.y);
  }

}