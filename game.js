const { Maze } = require('./maze');
const { Gnome, newGnome }  =require('./gnome');

const isSamePosition = (p1, p2) => {
  return p1[0] === p2[0] && p1[1] === p2[1];
};

class Game {
  constructor(path){
    this.maze = new Maze(path);
    this.gnomes = [];
    this.teams = {};
  }

  createTeam(teamName, n) {
    return new Array(n).fill({}).map(() => {
      const gnome = newGnome(Math.floor(Math.random()*10), teamName);
      return gnome;
    });
  }

  init(team1Name='beasts', team2Name='angels') {
    return this.maze.init().then(() => {
      this.team1 = this.createTeam(team1Name, 2)
      this.team2 = this.createTeam(team2Name, 2);
      this.teams[team1Name] = this.team1;
      this.teams[team2Name] = this.team2;
      this.team1.forEach((gnome) => {
        this.maze.placeGnomeRandomly(gnome);
      });
      this.team2.forEach((gnome) => {
        this.maze.placeGnomeRandomly(gnome);
      });
      return;
    });
  }

  checkCollisions() {
    // assume if 4 gnomes approach the same space at once 2 of each team they will combine first and then fight.
    
    for (const team in this.teams) {
      this.teams[team].forEach((g1) => {
        this.teams[team].filter(g2 => g1.id !== g2.id).forEach((g2) => {
          if (!g1.inPlay || !g2.inPlay) {
            return;
          }
          if (this.checkGnomeCollisions(g1, g2)){
            this.teamCollision(g1, g2);
          }
        });
      });
    }

    for (const team1 in this.teams) {
      this.teams[team1].forEach((g1) => {
        for (const team2 in this.teams) {
          if (team2 !== team1) {
            this.teams[team2].forEach((g2) => {
              if (this.checkGnomeCollisions(g1, g2))
                this.battleCollision(g1, g2);
            });
          }
        }
      })
    }
  }

  teamCollision(g1, g2) {
    // get gnome stats
    console.log('teamcollision');
    const newStrength = g1.strength + g2.strength;
    const team = g1.team;
    const position = g1.moveToPos;
    // delete both gnomes
    this.removeGnome(g1);
    this.removeGnome(g2);
    // create new gnome in spot
    const gnome = newGnome(newStrength, team);
    gnome.moveToPos = position;
    //  how do I know if its team one or two aaaaaaagh!
    this.teams[team].push(gnome);
  }

  battleCollision(g1, g2) {
    // delete weaker gnome
    const ranking = [g1, g2].sort((b, a) => {
      return a.strength - b.strength;
    });

    this.removeGnome(ranking[1]);
    // put stronger gnome in spot
    // ***** will not work not all gnomes have moved yet therefore will be collisions... ***
    // *** solution: split the checks from the matrix for moving object. 
    // first check for physical barriers, update moveToPos (default to curent possition if cannot move) 
    // then check for all collisions against moveToPos... call mvoe to post posTPlusOne... pos\' ???
    const winningGnome = ranking[0];
  }

  removeGnome(gnome) {
    // change logic so that gnomes positions are not mapped into maze rows? Makes it easier to delete them in 1 place.
    for (const team in this.teams) {
      this.teams[team] = this.teams[team].filter(g => g.id !== gnome.id);
    }
    // this.maze.rows[pos[0], pos[1]] = ' ';
    gnome.inPlay = false;
    gnome = null;
  }

  checkGnomeCollisions(g1, g2) {
    return isSamePosition(g1.moveToPos, g2.moveToPos);
  }

  step() {
    for( const team in this.teams) {
      this.teams[team].forEach((gnome) => {
        gnome.update();
        if (!this.maze.isWalkable(gnome.moveToPos)){
          gnome.moveToPos = gnome.position;
        }
      });
    }
    this.checkCollisions();
    this.executeMoves();
  }

  executeMoves() {
    for( const team in this.teams) {
      this.teams[team].forEach((gnome) => {
        this.maze.placeGnome(gnome, gnome.moveToPos);
      });
    }
  }
  getMazeRowsWithGnomes() {
    const rows = this.maze.getMazeRowsCopy();
    for (const team in this.teams) {
      this.teams[team].forEach((g) => {
        const { position } = g;
        rows[position[0]][position[1]] = team === 'angels' ? '2' : '1';
      });
    }
    return rows;
  }

  rowsToString(rows) {
    return rows.map((row) => row.join('')).reduce((a,c) => {
      return a + '\n' + c;
    });
  }

  render() {

    const output = this.rowsToString(this.getMazeRowsWithGnomes());
    console.log('mazerows', this.rowsToString(this.maze.rows));
    console.log('output', output);
  }
};

module.exports = {
  Game,
};
