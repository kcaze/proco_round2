(function () {
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
  }

var level = 
  {
    // Level name
    name   : 'Reaction Zone 3',
    // Width of level in tiles
    width  : 100,
    // Height of level in tiles
    height : 100,
    // Player properties
    frog : {
      // Player's initial x position
      x : 50,
      // Player's initial y position
      y : 50,
      // Range for player's tongue, computed using Manhattan metric
      range : 0,
    },
    // List of flies, see below for example fly.
    flies : [],
    // List of walls, see below for example wall.
    walls: [],
    // Objective function, takes in number of flies eaten and moves made
    scoreFunction : function (flies, moves) {
      return Math.exp((flies * flies - moves) / 1000.);
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

var fliesInfo = [[58,46,"D"],[18,9,"U"],[56,43,"U"],[7,54,"L"],[40,42,"D"],[4,28,"R"],[75,95,"D"],[13,68,"R"],[57,36,"U"],[23,63,"R"],[69,45,"D"],[23,30,"R"],[84,51,"U"],[25,72,"U"],[41,83,"R"],[8,28,"U"],[56,19,"D"],[55,24,"R"],[32,49,"L"],[13,39,"D"],[93,1,"D"],[47,64,"U"],[90,48,"L"],[2,5,"R"],[81,82,"L"],[38,81,"L"],[28,29,"D"],[2,52,"L"],[93,20,"R"],[64,52,"L"],[20,50,"U"],[50,62,"U"],[82,33,"L"],[15,49,"D"],[33,32,"R"],[20,29,"D"],[33,56,"L"],[6,26,"L"],[83,56,"L"],[72,52,"R"],[56,41,"L"],[12,77,"L"],[39,47,"U"],[29,25,"D"],[1,14,"D"],[48,93,"L"],[11,62,"R"],[86,83,"L"],[42,4,"U"],[67,74,"D"],[63,91,"R"],[73,80,"U"],[45,9,"L"],[84,24,"D"],[31,62,"R"],[13,14,"U"],[51,83,"U"],[20,19,"D"],[40,0,"R"],[31,9,"R"],[16,47,"L"],[11,93,"R"],[24,74,"U"],[73,24,"D"],[20,39,"L"],[1,47,"D"],[3,37,"L"],[6,19,"L"],[43,91,"U"],[10,30,"U"],[44,17,"L"],[94,55,"L"],[0,26,"R"],[62,68,"D"],[81,79,"R"],[93,49,"R"],[65,5,"D"],[86,72,"R"],[87,92,"L"],[25,82,"U"],[3,69,"D"],[26,39,"U"],[85,2,"U"],[26,42,"L"],[78,65,"D"],[85,28,"R"],[59,73,"R"],[33,44,"R"],[36,85,"D"],[8,19,"R"],[20,67,"U"],[51,67,"R"],[38,61,"D"],[7,99,"R"],[30,29,"U"],[16,9,"L"],[80,7,"L"],[42,67,"U"],[86,29,"R"],[88,95,"U"]];

if (fliesInfo.length == 0) {
  for (var i = 0; i < 100; i++) {
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
