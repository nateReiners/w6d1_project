const DIRECTIONS = ["N", "S", "E", "W"];

class Snake {
  constructor() {
    this.length = 1;
    this.direction = DIRECTIONS[0];
    this.body = [[15, 9]];
  }
  grow() {
    this.length = this.length + 3;
  }
}


module.exports = Snake;
