

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
  constructor(strength) {
    this.strength = strength;
    this.direction = [0, 0];
    this.brain = () => {

    };
  }
}

module.exports = {
  randomCardinal,
  Gnome,
};