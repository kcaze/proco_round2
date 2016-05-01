var game = (function() {
var game = {levels: []};

game.initializeLevel = function (levelPrototype) {
  var level = Object.create(levelPrototype);

  // Initialize level variables
  function restart() {
    level.moves = 0;
    level.waits = 0;
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
    level.score = levelPrototype.scoreFunction(level.fliesCaught, level.moves, level.waits);
  }

  // Implement game functions
  function moveFrog(lvl, dx, dy) {
    var x = Math.min(lvl.width - 1, Math.max(0, lvl.frog.x + dx));
    var y = Math.min(lvl.height - 1, Math.max(0, lvl.frog.y + dy));
    if (lvl.walls[y][x]) return;
    lvl.frog.x = x;
    lvl.frog.y = y;
  }

  function isEatable(fly, prevx, prevy, currx, curry) {
    var tmp = Math.max(prevx, currx);
    prevx = Math.min(prevx, currx);
    currx = tmp;
    tmp = Math.max(prevy, curry);
    prevy = Math.min(prevy, curry);
    curry = tmp;

    var x = prevx;
    var y = prevy;
    var dx = currx == prevx ? 0 : 1;
    var dy = curry == prevy ? 0 : 1;

    while (x <= currx && y <= curry) {
      var dist = Math.abs(fly.x - x) + Math.abs(fly.y - y);
      if (dist <= level.frog.range) {
        return true;
      }
      if (dx == 0 && dy == 0) break;
      x += dx;
      y += dy;
    }
    return false;
  }

  function eatFlies(prevx, prevy, currx, curry) {
    var flies = [];
    level.flies.forEach(function (fly) {
      if (isEatable(fly, prevx, prevy, currx, curry)) return;
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
    if (direction != 'wait') {
      level.frog.drawDirection = level.frog.direction;
    }

    var prevx = level.frog.x;
    var prevy = level.frog.y;
    if (level.frog.moveFrog) {
      level.frog.moveFrog(level, dx, dy);
    } else {
      moveFrog(level, dx, dy);
    }
    var currx = level.frog.x;
    var curry = level.frog.y;
    eatFlies(prevx, prevy, currx, curry);
    moveFlies();
    eatFlies(currx, curry, currx, curry);

    level.moves++;
    if (direction == 'wait') {
      level.waits++;
    }
    level.fliesCaught = levelPrototype.flies.length - level.flies.length;
    level.score = levelPrototype.scoreFunction(level.fliesCaught, level.moves, level.waits);
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
