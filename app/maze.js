const loader = (path) => {
  if (typeof window === 'undefined') {
    const { loadTextFile } = require('./loadTextFile');
    return loadTextFile(path);
  } else {
    const data = require(`../${path}`);
    return new Promise((resolve, reject) => {
      return resolve(data);
    });
  }
};

const { loadTextFile } = require('./loadTextFile');

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
    return loader(this.path).then((data) => {
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
        row++;
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
      if (this.isWalkable([y, x])) {
        this.placeGnome(gnome, [y, x]);
        placed = true;
      }
    }
  }

  isWalkable(pos) {
    return this.rows[pos[0]][pos[1]] === ' ';
  }

  placeGnome(gnome, pos) {
    if (this.isWalkable(pos)) {
      // space is free;
      // this.rows[pos[0]][pos[1]] = gnome;
      return gnome.position = pos;
    }
    throw new Error('Cannot place gnome in occupied position!');
  }

  getMazeRowsCopy() {
    return this.rows.map(el => el.map(e => e));
  }

  getSubSection([y, x]) {
    return this.rows.slice(x - 1, x + 1).map(col => col.slice(y - 1, y + 1));
  }
}

module.exports = { Maze,
  loadTextFile,
};
