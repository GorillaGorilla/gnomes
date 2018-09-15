const { Maze } = require('./maze');
const { Gnome, newGnome }  =require('./gnome');

const isSamePosition = (p1, p2) => {
  return p1[0] === p2[0] && p1[1] === p2[1];
};

class Game {
  constructor(path){
    this.maze = new Maze(path);
    this.gnomes = [];
  }

  createTeam(teamName, n, maze) {
    return new Array(n).fill({}).map(() => {
      const gnome = newGnome(Math.floor(Math.random()*10), teamName);
      return gnome;
    });
  }

  init() {
    return this.maze.init().then(() => {
      this.team1 = this.createTeam('beasts', 2, this.maze)
      this.team2 = this.createTeam('angels', 2, this.maze);
      this.team1.forEach((gnome) => {
        this.maze.placeGnome(gnome);
      });
      this.team2.forEach((gnome) => {
        this.maze.placeGnome(gnome);
      });


      return;
    });
  }

  checkCollisions() {
    // assume if 4 gnomes approach the same space at once 2 of each team they will combine first and then fight.
    this.team1.forEach((g1) => {
      this.team1.filter(g2 => g1.id !== g2.id).forEach((g2) => {
        if (this.checkGnomeCollisions(g1, g2))
          this.teamCollision(g1, g2);
      });
    });
    this.team2.forEach((g1) => {
      this.team2.filter(g2 => g1.id !== g2.id).forEach((g2) => {
        if (this.checkGnomeCollisions(g1, g2))
          this.teamCollision(g1, g2);
      });
    });
    this.team1.forEach((g1) => {
      this.team2.filter(g2 => g1.id !== g2.id).forEach((g2) => {
        if (this.checkGnomeCollisions(g1, g2))
          this.battleCollision(g1, g2);
      });
    });

  }

  teamCollision(g1, g2) {
    // get gnome stats
    const newStrength = g1.strength + g2.strength;
    const team = g1.team;
    const position = g1.moveToPos;
    // delete both gnomes
    this.removeGnome(g1.id);
    this.removeGnome(g2.id);
    // create new gnome in spot
    const gnome = newGnome(newStrength, team);
    this.maze.placeGnome(gnome);
    //  how do I know if its team one or two aaaaaaagh!
  }

  battleCollision(g1, g2) {
    // delete weaker gnome
    // put stronger gnome in spot
  }

  removeGnome(gnome) {
    // change logic so that gnomes positions are not mapped into maze rows? Makes it easier to delete them in 1 place.
    this.team1 = team1.filter(g => g.id !== gnome.id);
    this.team2 = team2.filter(g => g.id !== gnome.id);
    this.maze.rows[gnome.position[0], gnome.position[1]] = ' ';
    gnome = null;
  }

  checkGnomeCollisions(g1, g2) {
    return isSamePosition(g1.moveToPos, g2.moveToPos);
  }
};


module.exports = {
  Game,
}
