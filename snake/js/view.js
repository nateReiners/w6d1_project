const Game = require('./game.js');

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
  }


  render() {
    const snakeBody = this.game.snake.body;
    snakeBody.forEach((pos) => {
      const x = pos[0];
      const y = pos[1];
      const $snakeBit = $('li').filter(function() {
        const coords = this.attr('pos').split(",").map((el) => parseInt(el));
        return ([x, y] === coords);
      });
    });

}}


module.exports = View;
