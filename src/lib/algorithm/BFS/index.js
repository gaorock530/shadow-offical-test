/**
 * Breadth-Frist Search
 */

class Node {

  constructor(value) {
    this.value = value || 0;
    this.edges = [];
    this.searched = false;
    this.parent = null;
  }
  
  addEgde (n) {
    this.edges.push(n);
    // both directions!!
    n.edges.push(this);
  }

}


class Graph {
  constructor () {
    this.nodes = [];
    this.graph = {};
    this.start = null;  // starting Node for search
    this.end = null;  // end Node for search
  }

  setStart(value) {
    this.start = this.graph[value];
    return this.start;
  }

  setEnd (value) {
    this.end = this.graph[value];
    return this.end;
  }

  addNode (n) {
    this.nodes.push(n);
    this.graph[n.value] = n;
  }

  getNode (value) {
    return this.graph[value];
  }
}



export {
  Node,
  Graph
}