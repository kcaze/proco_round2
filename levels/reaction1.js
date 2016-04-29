(function () {
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
  }

var level = 
  {
    // Level name
    name   : 'Reaction Zone 1',
    // Width of level in tiles
    width  : 12,
    // Height of level in tiles
    height : 12,
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
      return Math.exp((flies * flies - moves) / 100.);
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

var walk = function(f) {
  if (f[2] == 'D') return [f[0], f[1] + 1];
  if (f[2] == 'U') return [f[0], f[1] - 1];
  if (f[2] == 'L') return [f[0] - 1, f[1]];
  if (f[2] == 'R') return [f[0] + 1, f[1]];
};

var fliesInfo = [[4,1,"X"],[6,3,"L"],[8,10,"D"],[3,5,"U"],[7,8,"L"],[11,6,"L"],[0,2,"D"],[1,4,"U"],[1,2,"R"],[7,11,"L"],[11,3,"U"],[4,9,"D"],[6,0,"R"],[5,8,"L"],[10,0,"R"],[6,10,"U"],[11,7,"D"],[6,5,"U"],[4,2,"L"],[2,7,"U"]];

if (fliesInfo.length == 0) {
  for (var i = 0; i < 20; i++) {
    var fly;
    do {
      fly = genFly();
    } while ((function(x, y){
      for (var k = 0; k < fliesInfo.length; k++) {
        if (fliesInfo[k][0] == x && fliesInfo[k][1] == y)
      return true;
    var tmp = walk(fly);
    if (fliesInfo[k][0] == tmp[0] && fliesInfo[k][1] == tmp[1])
      return true;
    tmp = walk(fliesInfo[k]);
    if (tmp[0] == fly[0] && tmp[1] == fly[1])
      return true;
      }
      return false;
    })(fly[0], fly[1]));
    fliesInfo.push(fly);
  }
  fliesInfo[0][2] = 'X';
  var blob = new Blob([JSON.stringify(fliesInfo)]);
  saveAs(blob, "cooperation1.json");
  var input = "";
  input = input.concat("{0} {1}\n".format(level.width, level.height));
  input = input.concat("{0} {1}\n".format(level.frog.x, level.frog.y));
  input = input.concat("{0}\n".format(fliesInfo.length));
  for (var i = 0; i < fliesInfo.length; i++)
    input = input.concat("{0} {1} {2}\n".format(fliesInfo[i][0], fliesInfo[i][1], fliesInfo[i][2]));
  saveAs(new Blob([input]), "cooperation1.txt");
}

for (var i = 0; i < fliesInfo.length; i++) {
  var cur = fliesInfo[i];
  level.flies.push({
    x: cur[0], 
    y: cur[1], 
    hasMoved: i == 0 ? true : false, // need to expose the first fly
    move : (function(timeToDie, dirChar) {
      return function(level) {
        if (level.flies.length == timeToDie && this.hasMoved == false) {
          this.hasMoved = true;
          if (dirChar == 'U') {
            return {x : this.x, y : this.y - 1};
          } else if (dirChar == 'D') {
            return {x : this.x, y : this.y + 1};
          } else if (dirChar == 'L') {
            return {x : this.x - 1, y : this.y};
          } else {
            return {x : this.x + 1, y : this.y};
          }
        }
        return {x : this.x, y : this.y};
      }
    })(fliesInfo.length - i, cur[2])
  });

  if (i > 0)
    level.walls.push({x : cur[0], y : cur[1]});
}

game.levels.push(level);
})();
