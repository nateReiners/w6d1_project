class View {
  constructor(game, $el) {
    console.log(`view constructor has run`);
    this.game = game;
    this.$el = $el;
    this.setUpTowers();
    this.render();
    $('ul').click((e) => {
      if (this.takePileId) {
        const $pile = $(e.currentTarget);
        const dropPileId = $pile.attr('id');
        const takePile = parseInt(this.takePileId);
        const putPile = parseInt(dropPileId);
        if (this.game.isValidMove(takePile, putPile)) {
          this.game.move(takePile, putPile);
          this.render();
          if (this.game.isWon()) {
            const message = $('<h3>Congratulations, you win!</h3>');
            this.$el.append(message);
            $('ul').off('click');
          }
        } else {
          alert("Invalid move!");
        }
        $(`#${this.takePileId}`).removeClass("selected");
        this.takePileId = null;
      } else {
        const $pile = $(e.currentTarget);
        $pile.addClass("selected");
        const takePileId = $pile.attr('id');
        this.takePileId = takePileId;
      }
    });
  }

  setUpTowers() {
    for (let i = 0; i < 3; i++) {
      const $ul = $("<ul></ul>");
      $ul.attr("id", i.toString());
      this.$el.append($ul);
    }
  }

  render() {
    const towers = this.game.towers;
    let i = 0;
    $('ul').empty();
    towers.forEach((tower) => {
      tower.forEach((disc) => {
        const $li = $(`<li></li>`);
        $li.width(50 * disc);
        const $ul = $(`#${i.toString()}`);
        $ul.append($li);
      });
      i++;
    });
  }
}

module.exports = View;
