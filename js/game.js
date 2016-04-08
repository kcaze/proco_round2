var game = (function() {
var game = {};

game.levels = [
  {
    name   : 'Level 1',
    width  : 5,
    height : 5,
    frog : {
      x : 2,
      y : 2,
      range : 1,
    },
    flies : [
      {x:0,y:0,move:function() { return {x:0, y:0}; }},
      {x:4,y:0,move:function() { return {x:4, y:0}; }},
      {x:0,y:4,move:function() { return {x:0, y:4}; }},
      {x:4,y:4,move:function() { return {x:4, y:4}; }}
    ],
    walls: [],
    scoreFunction : function (flies, moves) {
      return (flies*flies)/(moves+1);
    }
  },
  {
    name   : 'Level 2',
    width  : 5,
    height : 5,
    frog : {
      x : 2,
      y : 2,
      range : 1,
    },
    flies : [],
    walls: [],
    scoreFunction : function (flies, moves) {
      return flies/(moves+1);
    }
  },
  {
    name   : 'Level 3',
    width  : 5,
    height : 5,
    frog : {
      x : 2,
      y : 2,
      range : 1,
    },
    flies : [],
    walls: [],
    scoreFunction : function (flies, moves) {
      return flies/(moves+1);
    }
  }
];

game.initializeLevel = function (levelPrototype) {
  var level = Object.create(levelPrototype);

  // Initialize level variables
  function restart() {
    level.moves = 0;
    level.flies = [];
    level.walls = [];
    level.frog = Object.create(levelPrototype.frog);
    levelPrototype.flies.forEach(function (fly) {
      level.flies.push(Object.create(fly));
    });
    for (var ii = 0; ii < levelPrototype.height; ii++) {
      var w = [];
      for (var jj = 0; jj < levelPrototype.width; jj++) {
        level.walls.push(false);
      }
      level.walls.push(w);
    }
    levelPrototype.walls.forEach(function (wall) {
      level.walls[wall.y][wall.x] = true;
    });
    level.fliesCaught = levelPrototype.flies.length - level.flies.length;
    level.score = levelPrototype.scoreFunction(level.fliesCaught, level.moves);
  }

  // Implement game functions
  function moveFrog(dx, dy) {
    var x = Math.min(level.width - 1, Math.max(0, level.frog.x + dx));
    var y = Math.min(level.height - 1, Math.max(0, level.frog.y + dy));
    if (level.walls[y][x]) return;
    level.frog.x = x;
    level.frog.y = y;
  }

  function isEatable(fly) {
    var dist = Math.abs(fly.x - level.frog.x) + Math.abs(fly.y - level.frog.y);
    return dist <= level.frog.range;
  }

  function eatFlies() {
    var flies = [];
    level.flies.forEach(function (fly) {
      if (isEatable(fly)) return;
      flies.push(fly);
    });
    level.flies = flies;
  }

  function moveFlies() {
    for (var ii = 0; ii < level.flies.length; ii++) {
      var pos = level.flies[ii].move(level);
      level.flies[ii].x = pos.x;
      level.flies[ii].y = pos.y;
    }
  }

  function step(direction) {
    var d = {left:0, up:1, right:2, down:3, wait:4}[direction];
    var dx = [-1, 0, 1, 0, 0][d];
    var dy = [0, -1, 0, 1, 0][d];

    moveFrog(dx, dy);
    eatFlies();
    moveFlies();
    eatFlies();

    level.moves++;
    level.fliesCaught = levelPrototype.flies.length - level.flies.length;
    level.score = levelPrototype.scoreFunction(level.fliesCaught, level.moves);
  }

  level.runLog = function (log, nSteps) {
    restart();
    for (var ii = 0; ii < nSteps; ii++) {
      step(log[ii]);
    }
  }

  restart();

  return level;
}

return game;

})();
