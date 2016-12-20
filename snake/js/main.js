const Game = require('./game.js');
const View = require('./view.js');


$( () => {
  const game = new Game();
  const view = new View(game, $('.snake'));
});
