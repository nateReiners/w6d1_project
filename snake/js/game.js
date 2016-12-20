const Board = require('./board.js');
const Snake = require('./snake.js');

class Game {
  constructor() {
    this.board = new Board();
    this.snake = new Snake();
  }
}

module.exports = Game;
