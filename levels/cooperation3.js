(function () {
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
  }

var level = 
  {
    // Level name
    name   : 'Cooperation 3',
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

var fliesInfo = [[7,43,"U"],[65,53,"L"],[48,48,"U"],[1,12,"L"],[79,98,"R"],[62,44,"D"],[15,50,"D"],[40,42,"D"],[77,30,"R"],[65,46,"L"],[24,29,"U"],[58,68,"L"],[5,61,"L"],[58,32,"R"],[97,88,"D"],[82,84,"R"],[3,36,"D"],[40,24,"D"],[7,37,"L"],[32,7,"D"],[84,12,"R"],[75,15,"L"],[31,76,"L"],[5,69,"R"],[37,69,"U"],[73,60,"D"],[89,70,"U"],[37,26,"D"],[65,10,"L"],[89,81,"L"],[3,44,"U"],[80,54,"R"],[67,34,"L"],[3,4,"U"],[62,37,"L"],[89,12,"L"],[45,84,"D"],[0,4,"D"],[20,67,"L"],[19,66,"L"],[51,46,"R"],[95,81,"D"],[46,8,"U"],[17,19,"R"],[33,51,"R"],[92,65,"L"],[59,7,"U"],[18,63,"L"],[81,38,"R"],[59,33,"R"],[40,56,"D"],[61,86,"L"],[11,25,"D"],[54,82,"R"],[2,71,"R"],[80,78,"U"],[88,21,"U"],[56,64,"L"],[25,1,"D"],[44,14,"U"],[35,88,"L"],[27,59,"L"],[2,92,"L"],[15,26,"R"],[85,84,"U"],[68,80,"L"],[88,25,"R"],[34,79,"D"],[20,31,"L"],[30,39,"R"],[46,46,"U"],[49,61,"L"],[7,46,"U"],[98,98,"L"],[44,48,"R"],[60,81,"D"],[84,9,"D"],[74,46,"L"],[83,60,"U"],[69,94,"R"],[18,26,"U"],[97,15,"U"],[74,80,"D"],[85,98,"D"],[82,24,"L"],[42,21,"U"],[98,12,"L"],[16,63,"R"],[57,53,"L"],[29,97,"D"],[37,52,"D"],[49,57,"D"],[11,11,"R"],[54,72,"U"],[83,58,"R"],[67,15,"U"],[79,51,"L"],[96,98,"U"],[94,50,"R"],[95,87,"D"]];

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
