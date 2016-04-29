var game = (function() {
var game = {levels: []};

game.initializeLevel = function (levelPrototype) {
  var level = Object.create(levelPrototype);

  // Initialize level variables
  function restart() {
    level.moves = 0;
    level.flies = [];
    level.walls = [];
    level.frog = Object.create(levelPrototype.frog);
    level.frog.shiftx = level.frog.x - 3;
    level.frog.shifty = level.frog.y - 3;
    levelPrototype.flies.forEach(function (fly) {
      level.flies.push(Object.create(fly));
    });
    for (var ii = 0; ii < levelPrototype.height; ii++) {
      var w = [];
      for (var jj = 0; jj < levelPrototype.width; jj++) {
        w.push(false);
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
  function moveFrog(lvl, dx, dy) {
    var x = Math.min(lvl.width - 1, Math.max(0, lvl.frog.x + dx));
    var y = Math.min(lvl.height - 1, Math.max(0, lvl.frog.y + dy));
    if (lvl.walls[y][x]) return;
    lvl.frog.x = x;
    lvl.frog.y = y;
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
      if (pos.x > level.flies[ii].x) {
        level.flies[ii].direction = 'r';
      } else if (pos.x < level.flies[ii].x) {
        level.flies[ii].direction = 'l';
      } else if (pos.y < level.flies[ii].y) {
        level.flies[ii].direction = 'u';
      } else if (pos.y > level.flies[ii].y) {
        level.flies[ii].direction = 'd';
      }
      level.flies[ii].x = pos.x;
      level.flies[ii].y = pos.y;
    }
  }

  function step(direction) {
    var d = {left:0, up:1, right:2, down:3, wait:4}[direction];
    var dx = [-1, 0, 1, 0, 0][d];
    var dy = [0, -1, 0, 1, 0][d];

    level.frog.direction = direction[0];
    if (level.frog.moveFrog) {
      level.frog.moveFrog(level, dx, dy);
    } else {
      moveFrog(level, dx, dy);
    }
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
  level.step = step;

  restart();

  return level;
}

return game;

})();
