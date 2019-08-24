import range from 'helper/range';

export default class DNA {
  constructor (num) {
    this.genes = [];
    this.fitness = 0;  // fittness score
    this.prob = 0;      // probability of pass on next generation
    for (let i=0;i<num;i++) {
      this.genes[i] = newChar();
    }
  }

  getPhrase () {
    return this.genes.join('');
  }

  // Fitness function (returns floating point % of "correct" characters)
  calcFitness(target) {
    const len = this.genes.length;
    let score = 0;
    for (let i = 0; i < len; i++) {
      if (this.genes[i] === target.charAt(i)) {
        score++;
      }
    }
    this.fitness = Math.pow(score / len, 10); // improved fitness function
    // this.fitness = (score / len);
  }

  // Crossover
  crossover(partner) {
    // A new child
    const child = new DNA(this.genes.length);

    let midpoint = Math.floor(Math.random() * this.genes.length); // Pick a midpoint

    // Half from one, half from the other
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  }

  // Based on a mutation probability, picks a new random character
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  }
}

function newChar () {
  let c = Math.floor(range(32, 122)); // 63
  // if (c === 63) c = 32;
  // if (c === 64) c = 46;

  return String.fromCharCode(c);
}