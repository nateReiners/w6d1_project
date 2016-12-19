class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
  }

  bindEvents() {
    let pos;

    $('li').on("click", e => {
      const $sq = $(e.currentTarget);
      pos = $sq.attr('pos').split(",").map((el) => parseInt(el));
      if ($sq.hasClass("marked")) {
        alert("Invalid Move!");
      } else {
        this.makeMove($sq, this.game.currentPlayer);
        this.game.playMove(pos);
        if (this.game.isOver()) {
          if (this.game.winner()) {
            const $h3 = $(`<h3>Congratulations ${this.game.winner().toUpperCase()}! You Win!</h3>`);
            this.$el.append($h3);
            $('li').off("click");
          } else {
            const $h3 = $(`<h3>The game is a draw!</h3>`);
            this.$el.append($h3);
          }
          $('li').on("click", e => alert("The game is already over!! Go home!"));
        }
      }
    });

  }

  makeMove($square, mark) {
    $square.addClass('marked');
    $square.text(mark);
  }

  setupBoard() {
    let $grid = $("<ul></ul>");
    for (let i = 0; i < 3; i++ ) {
      for (let j = 0; j < 3; j++) {
        const $li = $("<li></li>");
        $li.attr('pos', [i, j]);
        // $li.on("click", e => {
        //   const $sq = $(e.currentTarget);
        //   alert($sq.attr('pos'));
        // });
        $grid.append($li);
      }
    }
    this.$el.append($grid);
  }
}

module.exports = View;
