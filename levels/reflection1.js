(function () {
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
  }
var level = 
  {
    // Level name
    name   : 'Reflection 1',
    // Width of level in tiles
    width  : 12,
    // Height of level in tiles
    height : 12,
    // Player properties
    frog : {
      // Player's initial x position
      x : 3,
      // Player's initial y position
      y : 4,
      // Range for player's tongue, computed using Manhattan metric
      range : 0,
    },
    // List of flies, see below for example fly.
    flies : [],
    // List of walls, see below for example wall.
    walls: [],
    // Objective function, takes in number of flies eaten and moves made
    scoreFunction : function (flies, moves, waits) {
      return flies - (moves - waits);
    },

    inMap: function(x, y) {
      return x >= 0 && y >= 0 && x < this.width && y < this.height;
    },

    hasWall: function(x, y) {
      return !this.inMap(x, y) || this.walls[y][x];
    },
    
  };
var genFly = function() {
  while (true) {
    var x = getRandomInt(0, level.width);
    var y = getRandomInt(0, level.height);
    var dir = getRandomInt(0, 4);
    if (dir == 0) {
      if (y + 1 < level.height) return [x, y, 'D'];
    } else if (dir == 1) {
      if (x + 1 < level.width) return [x, y, 'R'];
    } else if (dir == 2) {
      if (y - 1 >= 0) return [x, y, 'U'];
    } else {
      if (x - 1 >= 0) return [x, y, 'L'];
    }
  }
};

var Dx = {
  'U' : 0,
  'D' : 0,
  'L' : -1,
  'R' : 1,
};

var Dy = {
  'U' : 1,
  'D' : -1,
  'L' : 0,
  'R' : 0,
};

var leftdir = {
  'U' : 'L',
  'D' : 'R',
  'L' : 'D',
  'R' : 'U',
};

var rightdir = {
  'U' : 'R',
  'D' : 'L',
  'L' : 'U',
  'R' : 'D',
};

var wallsInfo = [[0,7],[1,8],[2,9],[3,10],[4,11],[0,6],[1,5],[2,4],[3,3],[4,2],[5,1],[6,0],[7,0],[8,1],[9,2],[10,3],[11,4],[5,11],[6,10],[7,9],[8,8],[9,7],[10,6],[11,5]];

var fliesInfo = [[4,6,"R"],[8,0,"L"],[9,8,"R"],[8,3,"L"],[4,4,"U"],[3,1,"L"],[1,4,"D"],[1,6,"U"],[9,5,"D"],[10,9,"L"]];

if (wallsInfo.length == 0) {
  function addLineWall(k, b) {
    var y = b;
    for (var x = 0; x < level.width; x++, y = y + k) {
      if (level.inMap(x, y))
        wallsInfo.push([x,y]);
    }
  }

  addLineWall(1, 7);
  addLineWall(-1, 6);
  addLineWall(1, -7);
  addLineWall(-1, 16);

  for (var i = 0; i < 10; i++) {
    var fly;
    do {
      fly = genFly();
    } while ((function(x, y) {
      for (var k = 0; k < wallsInfo.length; k++)
      if (wallsInfo[k][0] == x && wallsInfo[k][1] == y)
      return true;
    return false;
    })(fly[0], fly[1]));
    fliesInfo.push(fly);
  }

  var blob = new Blob([JSON.stringify(wallsInfo), '\n', JSON.stringify(fliesInfo)]);
  saveAs(blob, "reflection1.json");
  var input = "";
  input = input.concat("{0} {1}\n".format(level.width, level.height));
  input = input.concat("{0} {1}\n".format(level.frog.x, level.frog.y));
  input = input.concat("{0}\n".format(wallsInfo.length));
  for (var i = 0; i < wallsInfo.length; i++)
    input = input.concat("{0} {1}\n".format(wallsInfo[i][0], wallsInfo[i][1]));
  input = input.concat("{0}\n".format(fliesInfo.length));
  for (var i = 0; i < fliesInfo.length; i++)
    input = input.concat("{0} {1} {2}\n".format(fliesInfo[i][0], fliesInfo[i][1], fliesInfo[i][2]));
  saveAs(new Blob([input]), "reflection1.txt");
}

for (var i = 0; i < fliesInfo.length; i++) {
  var cur = fliesInfo[i];
  level.flies.push({
    x: cur[0], 
    y: cur[1], 
    dir: cur[2],
    move : (function(dx, dy, leftdir, rightdir) {
      return function(level) {
        var nx = this.x + dx[this.dir];
        var ny = this.y + dy[this.dir];
        if (!level.inMap(nx, ny)) {
          return {x : this.x, y : this.y};
        }
        if (!level.hasWall(nx, ny)) {
          return {x : nx, y : ny};
        }

        var rx = this.x + dx[rightdir[this.dir]];
        var ry = this.y + dy[rightdir[this.dir]];
        var rw = level.hasWall(rx, ry);
        var lx = this.x + dx[leftdir[this.dir]];
        var ly = this.y + dy[leftdir[this.dir]];
        var lw = level.hasWall(lx, ly);

        if ((lw && rw) || (!lw && !rw)) {
          return {x : this.x, y : this.y};
        }
        if (lw) {
          this.dir = rightdir[this.dir];
          return {x : rx, y : ry};
        } else {
          this.dir = leftdir[this.dir];
          return {x : lx, y : ly};
        }
      };
    })(Dx, Dy, leftdir, rightdir),
  });
}

for (var i = 0; i < wallsInfo.length; i++) {
  level.walls.push({x : wallsInfo[i][0], y : wallsInfo[i][1]});
}


game.levels.push(level);
})();
