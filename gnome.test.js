const chai = require('chai');
const { Gnome } = require('./gnome');
chai.should();

describe('Gnome', () => {
  it('should create a gnome with a strength value', () => {
    const strength = 5;
    const gnome = new Gnome(strength);
    gnome.strength.should.equal(strength);
  });
});

