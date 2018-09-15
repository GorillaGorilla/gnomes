const chai = require('chai');
const { Game } = require('./game');

chai.should();

let game;

describe('Game', () => {

  beforeEach((done) => {
    game = new Game();
    game.init().then(() => done());
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

  it('should check colisions between gnomes after each step', () => {
    game.step();

  });

  it('should have a loop to update the state each turn', () => {
    // game.step();
  });

  it('should have a function to calculate when collisions occur between gnomes', () => {

  });
});
