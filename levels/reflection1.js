(function () {
var level = 
  {
    // Level name
    name   : 'Reflection 1',
    // Width of level in tiles
    width  : 5,
    // Height of level in tiles
    height : 5,
    // Player properties
    frog : {
      // Player's initial x position
      x : 2,
      // Player's initial y position
      y : 2,
      // Range for player's tongue, computed using Manhattan metric
      range : 0,
    },
    // List of flies, see below for example fly.
    flies : [],
    // List of walls, see below for example wall.
    walls: [],
    // Objective function, takes in number of flies eaten and moves made
    scoreFunction : function (flies, moves) {
      return moves - flies;
    },

    inMap: function(x, y) {
      return x >= 0 && y >= 0 && x < this.width && y < this.height;
    },

    hasWall: function(x, y) {
      return this.inMap(x, y) && this.walls[y][x];
    },
    
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

var fliesInfo = [
  [1,1,'U'],
];

var wallsInfo = [
  [0, 3],
  [1, 4],
  [3, 4],
  [4, 3],
  [0, 1],
  [1, 0],
  [4, 1],
  [3, 0],
];

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
          return {x : nx, y : ny};
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
