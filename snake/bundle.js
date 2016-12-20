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

	const Game = __webpack_require__(1);
	const View = __webpack_require__(2);


	$( () => {
	  const game = new Game();
	  const view = new View(game, $('.snake'));
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(3);
	const Snake = __webpack_require__(4);

	class Game {
	  constructor() {
	    this.board = new Board();
	    this.snake = new Snake();
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);