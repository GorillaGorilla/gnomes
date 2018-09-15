const fs = require('fs');
const Gnome = require('./gnome');

const loadTextFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};


class Wall {
  constructor(position) {
    this.position = position;
    this.type = 'WALL';
  }
}

class Maze {
  constructor(path) {
    this.path = path || 'test_maze.txt';
    this.loaded = false;
    this.x_dimension = null;
    this.y_dimension = null;
    this.rows = [];
  }

  init() {
    return this.loadMaze().then(this.generateMaze.bind(this))
    .catch(e => console.log('error loading', e));
  }

  loadMaze() {
    return loadTextFile(this.path).then((data) => {
      this.loaded = true;
      return data;
    });
  }

  generateMaze(data) {
    let row = 0;
    this.rows[row] = [];
    // remember that coords are [y, x] >_<
    data.split('').forEach((el) => {
      if (el === '\n') {
        row ++;
        this.rows[row] = [];
        return;
      } 
      this.rows[row].push(el);
    });
    this.y_dimension = this.rows.length;
    this.x_dimension = this.rows[0].length;
    return this.rows;
  }

  placeGnomeRandomly(gnome) {
    let placed = false;
    while (placed === false) {
      const x = Math.floor(Math.random() * this.x_dimension);
      const y = Math.floor(Math.random() * this.y_dimension);
      if (this.rows[y][x] === ' ') {
        this.placeGnome(gnome, [y, x]);
      placed = true;
      }
    }
  }

  isWalkable(pos) {
    return this.rows[pos[0]][pos[1]] === ' '
  }

  placeGnome(gnome, pos) {
    if (this.isWalkable(pos)) {
        // space is free;
        // this.rows[pos[0]][pos[1]] = gnome;
        return gnome.position = pos;
    }
    throw new Error('Cannot place gnome in occupied position!');
  }
}

const newMaze = () => {

};

module.exports = { Maze,
  loadTextFile,
};