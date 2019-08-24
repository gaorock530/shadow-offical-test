import DNA from "./dna";
// import Pool from 'lib/algorithm/probability';

export default class Population {
  constructor (target, m, num) {
    this.target = target;
    this.population = [];   // current population
    this.matingPool = [];   // new generation of population
    this.generations = 0;
    this.finished = false;
    this.mutationRate = m;  // mutation rate
    
    this.perfectScore = 1;
    this.best = '';

    // initialize population size use 'num'
    for (let i=0; i<num; i++) {
      this.population[i] = new DNA(this.target.length);
    }
    this.calcFitness();
  }



  // Fill our fitness array with a value for every member of the population
  calcFitness () {
    const len = this.population.length;
    let sum = 0;
    for (let i=0;i<len; i++) {
      this.population[i].calcFitness(this.target);
      sum+=this.population[i].fitness;
    }
    
    for (let i=0; i<len; i++) {
      this.population[i].prob = this.population[i].fitness / sum;
    }
  }

  naturalSelection () {
    const len = this.population.length;
    this.matingPool = this.population.slice()
    

    // generate new population
    for (let i=0;i<len; i++) {
      const a = this.pick(this.matingPool);
      const b = this.pick(this.matingPool);
      const child = a.crossover(b);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }

  // Compute the current "most fit" member of the population
  evaluate() {
    let worldrecord = 0.0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness >= worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }
    this.best = this.population[index].getPhrase();
    if (worldrecord === this.perfectScore) {
      this.finished = true;
    }
  }

  // Compute average fitness for the population
  getAverageFitness() {
    let total = 0;
    for (let i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

  allPhrases() {
    let everything = "";

    let displayLimit = Math.min(this.population.length, 40);


    for (let i = 0; i < displayLimit; i++) {
      everything += this.population[i].getPhrase() + " <br/> ";
    }
    return everything;
  }

  pick (data) {
    let index = 0;
    let ran = Math.random();
    while (ran > 0) {
      ran = ran - data[index].prob;
      index++;
    }
    return data[index - 1];
  }
}