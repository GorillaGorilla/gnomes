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

let timeout = null;
let count = 0;



function startSim(game, rate) {
  timeout = setInterval(() => {
    console.log('step');
    game.step();
    game.render();
    // maximum 300 steps or it gets boring
    if (game.remainingGnomesCount() <= 1 || count > 5000) {
      clearInterval(timeout);
    }
    count++;
  }, rate);
}

const  start = (e) => {
  console.log('called');
  e.preventDefault();
  const numberOfTeams = Number(document.getElementById('teamNumber').value);
  const numberOfGnomes = Number(document.getElementById('gnomeNumber').value);

  const renderer = (dataString) => {

    document.getElementById('maze').innerHTML = dataString;
  };

  const config = { teamNames: teamName.slice(0, numberOfTeams), teamSize: numberOfGnomes, renderer };
  const game = new Game(config);

  game.init().then(() => {
    console.log('game ready');
    startSim(game, 30);
  });
};

document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('bStart').addEventListener('click', start);



  console.log('hi');
});


