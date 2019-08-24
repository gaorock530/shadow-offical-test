import React from 'react';
import {Graph, Node} from 'lib/algorithm/BFS';
import data from 'lib/algorithm/BFS/data.json';


export default class SecondShow extends React.PureComponent {
  constructor (props) {
    super(props);

    this.graph = new Graph();
    this.numbers = data.numbers;

    // initailize graph data
    for (let num of this.numbers) {
      const name = num.name;
      const contains = num.contains;
      const nameNode = new Node(name);
      this.graph.addNode(nameNode);

      for(let digit of contains) {
        const digitNode = this.graph.getNode(digit) || new Node(digit);
        this.graph.addNode(digitNode);
        nameNode.addEgde(digitNode);
      }
      
    }

    console.log(this.graph)

    // Breadth-frist search algorithm
    // STEP 1 
    this.start = this.graph.setStart('7');
    this.end = this.graph.setEnd('9');

    if (!this.start || !this.end) return console.warn('Invaild Node!');

    this.queue = [];


    // STEP 2
    this.start.searched = true;
    this.queue.push(this.start);

    // STEP 3 - searching
    while (this.queue.length > 0) {
      const current = this.queue.shift();

      if (current === this.end) {
        console.log('found', this.start);
        break;
      }

      const edges = current.edges;
      for (let edge of edges) {
        if (!edge.searched) {
          edge.searched = true;
          edge.parent = current;
          this.queue.push(edge);
        }
      }
    }

    // STEP 4 - back trace Path
    this.path = [];
    this.path.push(this.graph.end);
    
    let next = this.graph.end;
    while (next.parent) {
      this.path.push(next.parent);
      next = next.parent;
    }

    console.log(this.path);

  }

  componentDidMount() {
    const start = document.createElement('p');
    start.textContent = 'start number: ' + this.start.value;
    this.screen.appendChild(start);
    const end = document.createElement('p');
    end.textContent = 'end number: ' + this.end.value;
    this.screen.appendChild(end);



    const path = document.createElement('p');
    let text = 'path: ';
    if (this.path.length <= 1) {
      text+= 'not found!';
    } else {
      for (let i = this.path.length - 1;i>=0;i--) {
        text+=this.path[i].value;
        if (i !== 0) text+= ' ===> ';
      }
    }
    
    

    path.textContent = text;
    this.screen.appendChild(path);
  }

  

  render () {
    return (
      <div ref={el => this.screen = el} style={wrapperStyle}>
        <p>Breadth-Frist Sreach</p><br/>
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
