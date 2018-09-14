const chai = require('chai');
const { Gnome, randomCardinal } = require('./gnome');
chai.should();
const strength = 5;
let gnome;
describe('Gnome', () => {
  beforeEach(() => {
    gnome = new Gnome(strength);
  });

  it('should create a gnome with a strength value and direction value', () => {
    
    gnome.strength.should.equal(strength);
    gnome.direction.should.have.length(2);
  });

  it('should have an update function which sets direction', () => {
    gnome.update();
    (gnome.direction[0] === 0 && gnome.direction[1] === 0).should.equal(false);
  })
});

describe('Routines: randomCardinal', () => {
  it('should return a vector ', () => {
    const result = randomCardinal();
    result.should.have.length(2);
    (result[0] <=1 && result[0] >=-1).should.equal(true);
    (result[1] <=1 && result[0] >=-1).should.equal(true);
  });
})

