const Chance = require('chance');

const chance = new Chance();

const randomCardinal = () => {
  const direction = {
    0: [1, 0],  //north
    1: [-1, 0],  //south
    2: [0, 1],  //east
    3: [0, -1],  //west
  }
  return direction[Math.floor(Math.random() * 4)];
};


class Gnome {
  constructor(strength, team, id, brain=randomCardinal) {
    this.id = id;
    this.strength = strength;
    this.team = team;
    this.direction = [0, 0];
    this.position = [0, 0];
    this.moveSpeed = 1;
    this.brain = brain;
    this.name = chance.name();
    this.inPlay = true;
  }

  update() {
    this.direction = this.brain();
    this.moveToPos = this.moveTo();
  }

  moveTo() {
    const destinationY = this.position[0] + this.direction[0] * this.moveSpeed;
    const destinationX = this.position[1] + this.direction[1] * this.moveSpeed;
    return [destinationY, destinationX];
  }
}

let gnomeCount = 0;

const newGnome = (strength, team) => {
  const g = new Gnome(strength, team, gnomeCount);
  gnomeCount ++;
  return g;
};

module.exports = {
  randomCardinal,
  Gnome,
  newGnome,
};
