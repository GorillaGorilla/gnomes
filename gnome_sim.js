const { Game } = require('./game');

const teamName = [
  'angels',
  'beasts',
  'gondor',
  'mordor',
  'durins_folk',
  'rohan',
  'moria',
  'lonely_mountain',
];

const numberOfTeams = Number(process.argv[2]);
const numberOfGnomes = Number(process.argv[3]);

if (numberOfTeams > 8) {
  return console.log('Maximum 8 teams, please enter a number < 9');
}

if (numberOfGnomes * numberOfTeams > 40 ) {
  return console.log('Maximum total gnomes is set as 40, please enter valid inputs.');
}

let timeout = null;
let count = 0;

const game = new Game();

game.init(teamName.slice(0, numberOfTeams), numberOfGnomes).then(() => {
  startSim(game, 300);
});

function startSim(game, rate) {
  timeout = setInterval(() => {
    game.step();
    game.render();
    // maximum 300 steps or it gets boring
    if (count > 300) {
      clearInterval(timeout);
    }
    count ++;
  }, rate);
}

