(function () {
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
  }
var level = 
  {
    // Level name
    name   : 'Emulation Zone Level 1',
    // Width of level in tiles
    width  : 12,
    // Height of level in tiles
    height : 12,
    // Player properties
    frog : {
      // Player's initial x position
      x : 6,
      // Player's initial y position
      y : 6,
      // Range for player's tongue, computed using Manhattan metric
      range : 0,
    },
    // List of flies, see below for example fly.
    flies : [],
    // List of walls, see below for example wall.
    walls: [],
    // Objective function, takes in number of flies eaten and moves made
    scoreFunction : function (flies, moves, waits) {
      return Math.exp((flies-moves / 3) / 2.0);
    },

    inMap: function(x, y) {
      return x >= 0 && y >= 0 && x < this.width && y < this.height;
    },

    hasWall: function(x, y) {
      return !this.inMap(x, y) || this.walls[y][x];
    },
    
  };
var genFly = function() {
  var x = getRandomInt(0, level.width);
  var y = getRandomInt(0, level.height);
  return [x,y];
};

var wallsInfo = [[5,4],[11,11],[5,4],[2,8],[8,8],[8,9],[6,4],[4,1],[1,7],[6,5],[3,4],[3,11],[1,3],[11,3],[11,8],[9,2],[7,1],[0,1],[2,1],[0,1],[0,11],[0,2],[10,9],[7,2],[3,1],[11,11],[10,8],[9,0],[0,2],[2,5]];

var fliesInfo = [[11,5],[11,10],[5,2],[4,9],[4,6],[5,0],[11,6],[6,3],[11,6],[10,3],[4,2],[5,8],[10,3],[9,3],[5,5]];

if (wallsInfo.length == 0) {

  for (var i = 0; i < 30; i++) {
    var wall = genFly();
    while (wall[0] == level.frog.x && wall[1] == level.frog.y) {
      wall = genFly();
    }
    wallsInfo.push(wall);
  }

  for (var i = 0; i < 15; i++) {
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
  saveAs(blob, "emulation1.json");
  var input = "";
  input = input.concat("{0} {1}\n".format(level.width, level.height));
  input = input.concat("{0} {1}\n".format(level.frog.x, level.frog.y));
  input = input.concat("{0}\n".format(wallsInfo.length));
  for (var i = 0; i < wallsInfo.length; i++)
    input = input.concat("{0} {1}\n".format(wallsInfo[i][0], wallsInfo[i][1]));
  input = input.concat("{0}\n".format(fliesInfo.length));
  for (var i = 0; i < fliesInfo.length; i++)
    input = input.concat("{0} {1}\n".format(fliesInfo[i][0], fliesInfo[i][1]));
  saveAs(new Blob([input]), "emulation1.txt");
}

for (var i = 0; i < fliesInfo.length; i++) {
  var cur = fliesInfo[i];
  level.flies.push({
    x: cur[0], 
    y: cur[1], 
    dir: cur[2],
    move : function(level) {
      var nx = this.x;
      var ny = this.y;
      if (level.frog.direction == 'r') nx++;
      if (level.frog.direction == 'l') nx--;
      if (level.frog.direction == 'u') ny--;
      if (level.frog.direction == 'd') ny++;
      if (!level.inMap(nx, ny) || level.hasWall(nx, ny)) {
        return {x : this.x, y : this.y};
      }
      return {x : nx, y : ny};
    },
  });
}

for (var i = 0; i < wallsInfo.length; i++) {
  level.walls.push({x : wallsInfo[i][0], y : wallsInfo[i][1]});
}


game.levels.push(level);
})();
