const ORDER = ['leftNode', 'rightNode'];

export default class Node {
  constructor (value) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
    this.level = 0;
  }

  addNode (node) {
    // increase level
    node.setLevel(node.level+1);
    if (node.value <= this.value) {
      if (!this.leftNode) {
        this.leftNode = node;
      } else {
        this.leftNode.addNode(node);
      }
    } else if (node.value > this.value) {
      if (!this.rightNode) {
        this.rightNode = node;
      } else {
        this.rightNode.addNode(node);
      }
    }
  }

  search (value) {
    if (this.value === value) return this;
    if (value <= this.value && this.leftNode !== null) {
      return this.leftNode.search(value);
    } else if (value > this.value && this.rightNode !== null) {
      return this.rightNode.search(value);
    }
    return null;
  }

  visit (fn, order = true) {
    const self = this;
    const index1 = 1 - Number(order);

    if (self[ORDER[index1]] !== null) {
      self[ORDER[index1]].visit(fn, order);
    }
    fn(self.value);
    // console.log(self.value, self.level);
    const index2 = Math.abs(0 - Number(order));
    if (self[ORDER[index2]] !== null) {
      self[ORDER[index2]].visit(fn, order)
    };
  }

  setLevel (l) {
    this.level = l;
  }
}