const chai = require('chai');
const { Gnome } = require('./gnome');
chai.should();
const strength = 5;
const team = 'the seven';
let gnome;
describe('Gnome', () => {
  beforeEach(() => {
    gnome = new Gnome(strength, team, 1);
  });

  describe('randomWalk', () => {
    it('should set a new random direction', () => {
      gnome.setBehaviourTree('setRandomDirection');
      // gnome.brain.should.equal(false);
      gnome.update([]);

      gnome.direction.should.not.equal([0, 0]);
    });
  });



});
