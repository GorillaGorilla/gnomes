const fs = require('fs');

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

class Maze {
  constructor(path) {
    this.path = path || 'test_maze.txt';
    this.loaded = false;
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
    return this.rows;
  }
}

const newMaze = () => {

};

module.exports = { Maze,
  loadTextFile,
};