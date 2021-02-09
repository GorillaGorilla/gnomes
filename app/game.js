const { Maze } = require('./maze');
const { newGnome }  = require('./gnome');

const isSamePosition = (p1, p2) => {
  return p1[0] === p2[0] && p1[1] === p2[1];
};

const didSwapPositions = (g1, g2) => {
  // console.log('g1.position, g2.lastPosition', g1.position, g2.moveToPos, g2.position, g1.moveToPos, isSamePosition(g1.position, g2.moveToPos) && isSamePosition(g2.position, g1.moveToPos));
  return isSamePosition(g1.position, g2.moveToPos) && isSamePosition(g2.position, g1.moveToPos);
};

class Game {
  constructor({ teamNames, teamSize, renderer, path, strategies={} }){
    this.maze = new Maze(path);
    this.renderer = renderer;
    this.teamNames = teamNames;
    this.strategies = strategies;
    this.teamSize = teamSize;
    this.gnomes = [];
    this.teams = {};
    this.events = [];
  }

  createTeam(teamName, n) {
    return new Array(n).fill({}).map(() => {
      const gnome = newGnome(Math.floor(Math.random()*100) + 100, teamName);
      gnome.setBehaviourTree(this.strategies[teamName] || 'findWalkableDirection');
      return gnome;
    });
  }

  init() {
    return this.maze.init().then(() => {
      this.teamNames.forEach((name) => this.teams[name] = this.createTeam(name, this.teamSize));
      for (const team in this.teams) {
        this.teams[team].forEach((gnome) => {
          this.maze.placeGnomeRandomly(gnome);
        });
      }
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
              if (this.checkGnomeCollisions(g1, g2)){
                this.battleCollision(g1, g2);
              }
            });
          }
        }
      });
    }
  }

  teamCollision(g1, g2) {
    // get gnome stats
    console.log('teamcollision');
    const newStrength = g1.strength + g2.strength;
    const team = g1.team;
    const position = g1.moveToPos;
    // delete both gnomes
    this.events.push(`${g1.name} and ${g2.name} from team ${team} have met at 
    (${position[1]},${position[0]}) and combined into a strength ${newStrength} gnome.`);
    this.removeGnome(g1);
    this.removeGnome(g2);
    // create new gnome in spot
    const gnome = newGnome(newStrength, team);
    gnome.setBehaviourTree(g1.brain.tree);
    gnome.moveToPos = position;
    this.teams[team].push(gnome);
  }

  battleCollision(g1, g2) {
    const ranking = [g1, g2].sort((b, a) => {
      return a.strength - b.strength;
    });
    if (g1.strength === g2.strength) {
      // handle draw...
    }
    const position = g1.moveToPos;
    const winningGnome = ranking[0];
    this.events.push(`${winningGnome.name} from ${winningGnome.team}, ${ranking[1].name} from ${ranking[1].team} 
    have fought at (${position[1]},${position[0]}) and ${winningGnome.name} from ${winningGnome.team} was victorious.`);
    // delete weaker gnome
    this.removeGnome(ranking[1]);
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
    return isSamePosition(g1.moveToPos, g2.moveToPos) || didSwapPositions(g1, g2);
  }

  step() {
    for ( const team in this.teams) {
      this.teams[team].forEach((gnome) => {

        gnome.update(this.getMazeSubsection(gnome.position, gnome.los));
        if (!this.maze.isWalkable(gnome.moveToPos)){
          gnome.moveToPos = gnome.position;
        }
      });
    }
    this.checkCollisions();
    this.executeMoves();
  }

  executeMoves() {
    for ( const team in this.teams) {
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
        rows[position[0]][position[1]] = team.split('')[0].toUpperCase();
      });
    }
    return rows;
  }

  getMazeRowsWithGnomeReferences() {
    const rows = this.maze.getMazeRowsCopy();
    for (const team in this.teams) {
      this.teams[team].forEach((g) => {
        const { position } = g;
        rows[position[0]][position[1]] = g;
      });
    }
    return rows;
  }

  remainingGnomesCount() {
    let total = 0;
    for (const team in this.teams) {
      total += this.teams[team].length;
    }
    return total;
  }

  rowsToString(rows) {
    return rows.map((row) => row.join('')).reduce((a,c) => {
      return a + '\n' + c;
    });
  }

  getMazeSubsection([y, x], los=1) {
    const makeWallRow = length => Array(length).fill('#');
    const mazeCopy = this.getMazeRowsWithGnomeReferences();
    const yUnderset = (y - los) < 0 ? Math.abs(y - los) : 0;
    const xUnderset = (x - los) < 0 ? Math.abs(x - los) : 0;
    const yOverset = (y + los + 1) > mazeCopy.length ? (y + los + 1 - mazeCopy.length) : 0;
    const xOverset = (x + los + 1) > mazeCopy[0].length ? (x + los + 1 - mazeCopy[0].length) : 0;
    // 0 - 2 = -2 add 2 rows of #.
    const subset = mazeCopy.slice(Math.max(0, y - los), Math.min(mazeCopy.length, y + los + 1)).map(col => col.slice(Math.max(0, x - los), Math.min(mazeCopy[0].length, x + los + 1)));

    return [
      ...Array(yUnderset).fill({}).map(() => makeWallRow((2 * los) + 1)),
      ...subset.map(row => [
        ...makeWallRow(xUnderset),
        ...row,
        ...makeWallRow(xOverset)]),
      ...Array(yOverset).fill({}).map(() => makeWallRow((2 * los) + 1))
    ];
  }

  render() {
    const output = this.rowsToString(this.getMazeRowsWithGnomes());
    this.renderer(this, output);
    // console.log(output);
  }
};

module.exports = {
  Game,
};
