import React from 'react';
import Canvas from 'lib/canvas';

import {Zen} from 'lib/algorithm/genetic';

      

export default class Z extends React.PureComponent {


  componentDidMount () {
    
    this.canvas = new Canvas(this.screen);
    const z = new Zen(this.canvas);
    this.canvas.background(0);

    

    z.drawOutline()
    
    z.drawLayer();

    

    z.drawMouth()

    

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
  // backgroundColor: 'rgba(73, 69, 80, 1)'
}