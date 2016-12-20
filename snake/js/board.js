const BOARD_SIZE = 20;

class Board {
  constructor() {
    this.grid = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      const $ul = $('<ul></ul>');
      for (let j = 0; j < BOARD_SIZE; j++) {
        const $li = $('<li></li>');
        $li.attr('pos', [i, j]);
        $ul.append($li);
      }
      this.grid.push($ul);
    }
  }
}

module.exports = Board;
