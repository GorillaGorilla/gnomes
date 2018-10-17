const { Game } = require('../app/game');

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

const teamColours = [
  'darkgoldenrod',
  'indigo',
  'cyan',
  'lightgoldenrodyellow'
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

const createRenderer = () => {
  const container = document.querySelector('.container');
  let gnomeDivs = [];
  return (game, dataString) => {
    gnomeDivs.forEach(div => div.remove());
    for (const team in game.teams) {
      gnomeDivs = gnomeDivs.concat(game.getTeam(team).map((gnome) => {
        const gnomeDiv = document.createElement('div');
        gnomeDiv.setAttribute('style', `grid-column: ${gnome.position[1] + 1};
         grid-row: ${gnome.position[0] + 1};
         backgroundColor: ${teamColours[teamName.indexOf(gnome.team)]}
         `);
        gnomeDiv.setAttribute('class', 'gnome');
        gnomeDiv.innerText = gnome.strength;
        container.appendChild(gnomeDiv);
        return gnomeDiv;
      }));
    }
  };
};

const  start = (e) => {
  console.log('called');
  e.preventDefault();
  const numberOfTeams = Number(document.getElementById('teamNumber').value);
  const numberOfGnomes = Number(document.getElementById('gnomeNumber').value);

  const renderer = createRenderer();
  const config = { teamNames: teamName.slice(0, numberOfTeams), teamSize: numberOfGnomes, renderer };
  const game = new Game(config);

  game.init().then(() => {
    const container = document.querySelector('.container');
    const layout = game.maze.getMazeRowsCopy();
    layout.forEach((col, iRow) => {
      col.forEach((char, iCol) => {
        if (char === '#') {
          const newDiv = document.createElement('div');
          const className = document.createAttribute('class');
          // const gridArea = document.createAttribute('grid-area');
          // gridArea.value = `${iCol}-${iRow}`;
          className.value = 'wall';
          newDiv.setAttributeNode(className);
          newDiv.setAttribute('style', `display:grid; grid-column: ${iCol + 1}; grid-row: ${iRow + 1};`);
          container.appendChild(newDiv);
        }
      });
    });
    startSim(game, 30);
  });
};

document.addEventListener('DOMContentLoaded',function() {
  document.querySelector('.bStart').addEventListener('click', start);
});


