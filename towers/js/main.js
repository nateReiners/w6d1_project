const HanoiGame = require('./game.js');
const View = require('./hanoi-view.js');

$( () => {
  const rootEl = $('.toh');
  const game = new HanoiGame();
  new View(game, rootEl);
});
