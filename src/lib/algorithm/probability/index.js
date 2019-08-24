/**
 * Probability from Pool Selection
 * (different picking probabilities)
 */

// const data = [
//   {
//     name: 'mango',
//     score: 100, 
//   },
//   {
//     name: 'apple',
//     score: 350,
//   },
//   {
//     name: 'banana',
//     score: 210
//   },
//   {
//     name: 'orange',
//     score: 60
//   },
//   {
//     name: 'cherry',
//     score: 145
//   }
// ];

export default class PoolSelection {
  constructor (data, prop) {
    this.data = data;
    this.propName = prop || 'score';

    if (this.data) this.normalize();
  }

  normalize() {
    const len = this.data.length;
    let sum = 0;
    for (let i=0; i<len; i++) {
      sum+=this.data[i][this.propName];
    }
    
    for (let i=0; i<len; i++) {
      this.data[i].prob = this.data[i][this.propName] / sum;
    }
  }
  
  pick (data = this.data) {
    let index = 0;
    let ran = Math.random();
    while (ran > 0) {
      ran = ran - data[index].prob;
      index++;
    }
    return data[index - 1];
  }
}

// export default function (data, score, prob) {
//   const len = this.data.length;
//   let sum = 0;
//   for (let i=0; i<len; i++) {
//     sum+=this.data[i][this.propName];
//   }
  
//   for (let i=0; i<len; i++) {
//     this.data[i].prob = this.data[i][this.propName] / sum;
//   }

//   let index = 0;
//   let ran = Math.random();
//   while (ran > 0) {
//     ran = ran - data[index].prob;
//     index++;
//   }
//   return data[index - 1];
// }

