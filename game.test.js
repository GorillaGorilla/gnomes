const chai = require('chai');
const { Game } = require('./game');

chai.should();

let game;

describe('Game', () => {

  beforeEach(() => {
    game = new Game();
    return game.init(['angels', 'beasts'], 2);
  });

  it('should have a maze, and 2 teams', () => {
    game.should.have.property('maze');
    game.teams.should.have.property('angels').of.length(2);
    game.teams.should.have.property('beasts').of.length(2);
  });

  it('should have a placed the gnomes in different positions', () => {
    const pos1 = game.teams['beasts'][0].position;
    const pos2 = game.teams['beasts'][1].position;
    (pos1[0] === pos2[0] && pos1[1] === pos2[1]).should.equal(false);
  });

  it('check collision function handles 2 enemies', () => {
    const pos1 = [4, 1];
    const pos2 = [2, 1];
    const destination = [3, 1];
    const {beasts, angels}  = game.teams;
    beasts.pop();
    angels.pop();
    beasts[0].position = pos1;
    angels[0].position = pos2;
    beasts[0].strength = 5;
    angels[0].strength = 3;
    beasts[0].moveToPos = destination;
    angels[0].moveToPos = destination;
    game.checkCollisions();
    game.teams['angels'].should.have.length(0);
    game.teams['beasts'][0].moveToPos[0].should.equal(3);
    game.teams['beasts'][0].moveToPos[1].should.equal(1);
  });

  it('check collision function handles 2 allies', () => {
    const pos1 = [4, 1];
    const pos2 = [2, 1];
    const destination = [3, 1];
    // get the 2nd gnome
    const g2 = game.teams['beasts'].pop();
    const g1 = game.teams['beasts'][0];
    g1.strength = 3;
    g2.strength = 3;
    // clear team2
    game.teams['angels'].pop();
    game.teams['angels'].pop();
    // add the gnome back into team1
    game.teams['beasts'].push(g2);
    g1.position = pos1;
    g2.position = pos2;
    g1.moveToPos = destination;
    g2.moveToPos = destination;
    game.checkCollisions();
    game.teams['angels'].should.have.length(0);
    game.teams['beasts'].should.have.length(1);
    game.teams['beasts'][0].moveToPos[0].should.equal(3);
    game.teams['beasts'][0].moveToPos[1].should.equal(1);
    game.teams['beasts'][0].strength.should.equal(6);
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

  describe('Rendering the game state', () => {
    it('should have a function to replicate the maze rows and add in gnomes', () => {
      const pos1 = [4, 1];
      const pos2 = [2, 1];
      const destination = [3, 1];
      const {beasts, angels}  = game.teams;
      beasts.pop();
      angels.pop();
      beasts[0].position = pos1;
      angels[0].position = pos2;
      const rows = game.getMazeRowsWithGnomes();
      rows[4][1].should.equal('B');
      rows[2][1].should.equal('A');
    });
    it('should have a function to output the maze as a string', () => {
      const pos1 = [4, 1];
      const pos2 = [2, 1];
      const destination = [3, 1];
      const {beasts, angels}  = game.teams;
      beasts.pop();
      angels.pop();
      beasts[0].position = pos1;
      angels[0].position = pos2;
      const rows = game.getMazeRowsWithGnomes();
      const strings = game.rowsToString(rows);
      // console.log('strings', strings);
      strings.should.be.a('string');
      
    });
    it('should render', () => {
      game.step();
      game.render();
      game.step();
      game.render();
      game.step();
      game.render();
      game.step();
      game.render();
    });
  })
});
