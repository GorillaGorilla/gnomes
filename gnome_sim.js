const { Game } = require('./app/game');

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

const renderer = (game, string) => {
  console.log(game.events);
  console.log(string);
};
const config = { teamNames: teamName.slice(0, numberOfTeams), teamSize: numberOfGnomes, renderer };

const game = new Game(config);

game.init().then(() => {
  startSim(game, 30);
});

function startSim(game, rate) {
  timeout = setInterval(() => {
    game.step();
    game.render();
    // maximum 300 steps or it gets boring
    if (game.remainingGnomesCount() <= 1 || count > 5000) {
      clearInterval(timeout);
    }
    count++;
  }, rate);
}

