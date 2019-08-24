import Node from './node';

export default class Tree {
  constructor () {
    this.root = null;
    this.size = 0;
  }

  addValue (value) {
    this.size++;
    const node = new Node(value);
    if (!this.root) {
      this.root = node;
    } else {
      this.root.addNode(node);
    }
  }

  traverse (order) {
    const list = [];
    this.root.visit((value) => {
      list.push(value);
    }, order);
    return list;
  }

  sort (sToB) {
    return this.traverse(sToB);
  }

  search (value) {
    return this.root.search(value);
  }
}