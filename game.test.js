const chai = require('chai');
const { Game } = require('./game');

chai.should();

let game;

describe('Game', () => {

  beforeEach(() => {
    game = new Game();
    return game.init();
  });

  it('should have a maze, and 2 teams', () => {
    game.should.have.property('maze');
    game.should.have.property('team2').of.length(2);
    game.should.have.property('team1').of.length(2);
  });

  it('should have a placed the gnomes in different positions', () => {
    const pos1 = game.team1[0].position;
    const pos2 = game.team2[0].position;
    (pos1[0] === pos2[0] && pos1[1] === pos2[1]).should.equal(false);
  });

  it('check collision function', () => {
    const pos1 = [4, 1];
    const pos2 = [2, 1];
    const destination = [3, 1];
    game.team1.pop();
    game.team2.pop();
    game.team1[0].position = pos1;
    game.team2[0].position = pos2;
    game.team1[0].strength = 5;
    game.team2[0].strength = 3;
    game.team1[0].moveToPos = destination;
    game.team2[0].moveToPos = destination;
    game.checkCollisions();
    game.team2.should.have.length(0);
    game.team1[0].moveToPos[0].should.equal(3);
    game.team1[0].moveToPos[1].should.equal(1);
  });

  it('should check colisions between gnomes after each step', () => {
    console.log('START');
    console.log(game.team1);
    console.log(game.team2);
    game.step();
    console.log('1');
    console.log(game.team1);
    console.log(game.team2);
    game.step();
    console.log('2');
    console.log(game.team1);
    console.log(game.team2);
    game.step();
    console.log('3');
    console.log(game.team1);
    console.log(game.team2);
    

  });

  it('should have a loop to update the state each turn', () => {
    // game.step();
  });

  it('should have a function to calculate when collisions occur between gnomes', () => {

  });
});
