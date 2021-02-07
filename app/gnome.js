const { setBehaviourTreeForGnome, absolute } = require('./behaviour');
const Chance = require('chance');

const chance = new Chance();

const randomCardinal = (gnome={}) => {
  const directions = {
    0: [1, 0],  //north
    1: [-1, 0],  //south
    2: [0, 1],  //east
    3: [0, -1],  //west
  };
  const direction = directions[Math.floor(Math.random() * 4)];
  gnome.direction = direction;
  return direction;
};


class Gnome {
  constructor(strength, team, id, brain=randomCardinal) {
    this.id = id;
    this.strength = strength;
    this.team = team;
    this.direction = [0, 0];
    this.position = [0, 0];
    this.lastPosition = [0, 0];
    this.moveSpeed = 1;
    this.brain = { step: brain };
    this.name = chance.name();
    this.inPlay = true;
  }

  update(environment) {
    this.currentEnvironment = environment;
    this.brain.step(this);
    this.moveToPos = this.moveTo();
  }

  moveTo() {
    this.lastPosition = [...this.position];
    const destinationY = this.position[0] + absolute(this.direction[0]) * this.moveSpeed;
    const destinationX = this.position[1] + absolute(this.direction[1]) * this.moveSpeed;
    return [destinationY, destinationX];
  }

  setBehaviourTree(tree) {
    this.brain = setBehaviourTreeForGnome(this, tree);
  }

  getGnomesFromEnvironment() {
    if (!this.currentEnvironment) {
      return [];
    }

    return this.currentEnvironment.flat().filter(el => typeof el !== 'string').filter(g => g.id !== this.id) || [];
  }
}

let gnomeCount = 0;

const newGnome = (strength, team) => {
  const g = new Gnome(strength, team, gnomeCount);
  gnomeCount++;
  return g;
};

module.exports = {
  randomCardinal,
  Gnome,
  newGnome,
};
