/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const View = __webpack_require__(1);
	const Game = __webpack_require__(2);

	$( () => {
	  // Your code here
	  const game = new Game();
	  const view = new View(game, $('.ttt'));
	  view.setupBoard();
	  view.bindEvents();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(3);
	const MoveError = __webpack_require__(4);

	class Game {
	  constructor() {
	    this.board = new Board();
	    this.currentPlayer = Board.marks[0];
	  }

	  isOver() {
	    return this.board.isOver();
	  }

	  playMove(pos) {
	    this.board.placeMark(pos, this.currentPlayer);
	    this.swapTurn();
	  }

	  promptMove(reader, callback) {
	    const game = this;

	    this.board.print();
	    console.log(`Current Turn: ${this.currentPlayer}`)

	    reader.question('Enter rowIdx: ', rowIdxStr => {
	      const rowIdx = parseInt(rowIdxStr);
	      reader.question('Enter colIdx: ', colIdxStr => {
	        const colIdx = parseInt(colIdxStr);
	        callback([rowIdx, colIdx]);
	      });
	    });
	  }

	  run(reader, gameCompletionCallback) {
	    this.promptMove(reader, move => {
	      try {
	        this.playMove(move);
	      } catch (e) {
	        if (e instanceof MoveError) {
	          console.log(e.msg);
	        } else {
	          throw e;
	        }
	      }

	      if (this.isOver()) {
	        this.board.print();
	        if (this.winner()) {
	          console.log(`${this.winner()} has won!`);
	        } else {
	          console.log('NO ONE WINS!');
	        }
	        gameCompletionCallback();
	      } else {
	        // continue loop
	        this.run(reader, gameCompletionCallback);
	      }
	    });
	  }

	  swapTurn() {
	    if (this.currentPlayer === Board.marks[0]) {
	      this.currentPlayer = Board.marks[1];
	    } else {
	      this.currentPlayer = Board.marks[0];
	    }
	  }

	  winner() {
	    return this.board.winner();
	  }
	}

	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MoveError = __webpack_require__(4);

	class Board {
	  constructor() {
	    this.grid = Board.makeGrid();
	  }

	  isEmptyPos(pos) {
	    if (!Board.isValidPos(pos)) {
	      throw new MoveError('Is not valid position!');
	    }

	    return (this.grid[pos[0]][pos[1]] === null);
	  }

	  isOver() {
	    if (this.winner() != null) {
	      return true;
	    }

	    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
	      for (let colIdx = 0; colIdx < 3; colIdx++) {
	        if (this.isEmptyPos([rowIdx, colIdx])) {
	          return false;
	        }
	      }
	    }

	    return true;
	  }

	  placeMark(pos, mark) {
	    if (!this.isEmptyPos(pos)) {
	      throw new MoveError('Is not an empty position!');
	    }

	    this.grid[pos[0]][pos[1]] = mark;
	  }

	  print() {
	    const strs = [];
	    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
	      const marks = [];
	      for (let colIdx = 0; colIdx < 3; colIdx++) {
	        marks.push(
	          this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : " "
	        );
	      }
	      strs.push(`${marks.join('|')}\n`);
	    }

	    console.log(strs.join('-----\n'));
	  }

	  winner() {
	    const posSeqs = [
	      // horizontals
	      [[0, 0], [0, 1], [0, 2]],
	      [[1, 0], [1, 1], [1, 2]],
	      [[2, 0], [2, 1], [2, 2]],
	      // verticals
	      [[0, 0], [1, 0], [2, 0]],
	      [[0, 1], [1, 1], [2, 1]],
	      [[0, 2], [1, 2], [2, 2]],
	      // diagonals
	      [[0, 0], [1, 1], [2, 2]],
	      [[2, 0], [1, 1], [0, 2]]
	    ];

	    for (let i = 0; i < posSeqs.length; i++) {
	      const winner = this.winnerHelper(posSeqs[i]);
	      if (winner != null) {
	        return winner;
	      }
	    }

	    return null;
	  }

	  winnerHelper(posSeq) {
	    for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {
	      const targetMark = Board.marks[markIdx];
	      let winner = true;
	      for (let posIdx = 0; posIdx < 3; posIdx++) {
	        const pos = posSeq[posIdx];
	        const mark = this.grid[pos[0]][pos[1]];

	        if (mark != targetMark) {
	          winner = false;
	        }
	      }

	      if (winner) {
	        return targetMark;
	      }
	    }

	    return null;
	  }

	  static isValidPos(pos) {
	    return (0 <= pos[0]) &&
	    (pos[0] < 3) &&
	    (0 <= pos[1]) &&
	    (pos[1] < 3);
	  }

	  static makeGrid() {
	    const grid = [];

	    for (let i = 0; i < 3; i++) {
	      grid.push([]);
	      for (let j = 0; j < 3; j++) {
	        grid[i].push(null);
	      }
	    }

	    return grid;
	  }
	}

	Board.marks = ['x', 'o'];

	module.exports = Board;


/***/ },
/* 4 */
/***/ function(module, exports) {

	
	const MoveError = function (msg) { this.msg = msg; };

	// MoveError really should be a child class of the built in Error object provided
	// by Javascript, but since we haven't covered inheritance yet, we'll just
	// let it be a vanilla Object for now!

	module.exports = MoveError;


/***/ }
/******/ ]);