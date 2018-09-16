process.env.environment = process.env.environment || 'local';
const chai = require('chai');
const { Maze, loadTextFile } = require('./maze');

chai.should();

describe('Loading the maze', () => {

  describe('loadTextFile', () => {
    it('should return a string when the correct path is given', (done) => {
      loadTextFile('test_maze.txt').then((stringData) => {
        stringData.should.be.a('string');
        stringData[0].should.equal('#');
        stringData[23].should.equal('\n');
        done();
      });
    });

  });

  it('should create a maze', () => {
    const test_maze_path = './test_maze.txt';
    const maze = new Maze(test_maze_path);
    maze.loaded.should.equal(false);
  });

  it('should be able to load a map', (done) => {
    const test_maze_path = './test_maze.txt';
    const maze = new Maze(test_maze_path);
    maze.loadMaze().then(result => {
      result.should.be.a('string');
      result[0].should.equal('#');
      result[23].should.equal('\n');
      maze.loaded.should.equal(true);
      done();
    });
  });

  it('should encode the maze data in an array', () => {
    const maze = new Maze();
    const stringData = `#######################
#  #   #  #  #  #  #  
#  # a#   #  #  #  #  #
#  #      #     # b   #
#  ####   #  #  #  #  #
#  #  #   #  #  #  #  #
#     #   #  #  #    ##
#  x                  #
#######################`;
    const result = maze.generateMaze(stringData);
    maze.rows[0][0].should.equal('#');
    maze.rows[1][0].should.equal('#');
    maze.rows[1][1].should.equal(' ');
  });

  it('init should create stuff', (done) => {
    const test_maze_path = './test_maze.txt';
    const maze = new Maze(test_maze_path);
    maze.init().then((data) => {
      maze.rows[0][0].should.equal('#');
      maze.rows[1][0].should.equal('#');
      maze.rows[1][1].should.equal(' ');
      done();
    });
  });

  it('should have a function isWalkable', () => {
    const test_maze_path = './test_maze.txt';
    const maze = new Maze(test_maze_path);
    maze.init().then((data) => {
      maze.isWalkable([1, 1]).should.equal(true);
      maze.isWalkable([0, 0]).should.equal(false);
    });
  })
});