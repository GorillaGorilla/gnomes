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

  placeGnome(gnome) {
    let placed = false;
    while (placed === false) {
      const x = Math.floor(Math.random() * this.x_dimension);
      const y = Math.floor(Math.random() * this.y_dimension);
      console.log(y, x, this.rows[y][x]);

      if (this.rows[y][x] === ' ') {
        // space is free;
        this.rows[y][x] = gnome;
        gnome.position = [y, x];
        placed = true;
      }
    }
  }
}

const newMaze = () => {

};

module.exports = { Maze,
  loadTextFile,
};