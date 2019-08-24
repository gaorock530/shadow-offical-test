import React from 'react';
import Tobe from 'lib/algorithm/genetic-tobe';

let sefty = 0;

const popmax = 1500;
const mutationRate = 0.001;
const phrase = 'Love is a strange Thing  that you don\'t have! Or is it? Do you want to LOVE?! IF you want you can change the way you love.'
const phrase2 = 'ASCII stands for American Standard Code for Information Interchange. Below is the ASCII character table, including descriptions of the first 32 characters. ASCII was originally designed for use with teletypes, and so the descriptions are somewhat obscure and their use is frequently not as intended.'
const phrase3 = 'To be or not to be.'

export default class SecondShow extends React.PureComponent {
  constructor (props) {
    super(props);
    this.population = new Tobe(phrase3, mutationRate, popmax);
    this.run = this.run.bind(this);
  }

  componentDidMount() {
    this.best.textContent = this.population.best;
    this.tg.textContent = this.population.generations;
    this.af.textContent = this.population.getAverageFitness();
    this.tp.textContent = popmax;
    this.mr.textContent = mutationRate * 100 + "%";
    requestAnimationFrame(this.run)
  }

  run () {
    
    this.population.naturalSelection();
    this.population.calcFitness();
    this.population.evaluate();
    
    
    this.best.textContent = this.population.best;
    this.tg.textContent = this.population.generations;
    this.af.textContent = this.population.getAverageFitness();
    this.allPhrases.innerHTML = this.population.allPhrases();
    sefty++;
    if (sefty > 100000) return;
    if (this.population.finished) return;
    requestAnimationFrame(this.run)
  }

  

  render () {
    return (
      <div ref={el => this.screen = el} style={wrapperStyle}>
        <h3>To be or not to be, this is a problem!</h3><br/>
        <div style={{position: 'relative', display: 'flex'}}>
          <div style={deviderStyle}>
            <h3>Best Phrase:</h3><br/>
            <h2 ref={el => this.best = el}>123</h2><br/>
            <p>Total Generation: <span ref={el => this.tg = el}></span></p><br/>
            <p>Average Fitness: <span ref={el => this.af = el}></span></p><br/>
            <p>Total Population: <span ref={el => this.tp = el}></span></p><br/>
            <p>Mutation Rate: <span ref={el => this.mr = el}></span></p><br/>
          </div>
          <div style={deviderStyle}>
            <h2>All Phrases:</h2><br/>
            <div ref={el => this.allPhrases = el}></div>
          </div>
        </div>
      </div>
    )
  }
}

const wrapperStyle = {
  position: 'relative',
  width: '100%',
  height: '100vh',
  backgroundColor: '#eee',
}

const deviderStyle = {
  position: 'relative',
  flex: 1,
  // alignSelf: 'center'
}
