(function () {
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
  }

var level = 
  {
    // Level name
    name   : 'Cooperation 2',
    // Width of level in tiles
    width  : 12,
    // Height of level in tiles
    height : 50,
    // Player properties
    frog : {
      // Player's initial x position
      x : 0,
      // Player's initial y position
      y : 0,
      // Range for player's tongue, computed using Manhattan metric
      range : 0,
    },
    // List of flies, see below for example fly.
    flies : [],
    // List of walls, see below for example wall.
    walls: [],
    // Objective function, takes in number of flies eaten and moves made
    scoreFunction : function (flies, moves) {
      return 2 * flies - moves;
    },
  };

level.frog.y = level.height - 1;

var walk = function(f) {
  if (f[2] == 'D') return [f[0], f[1] + 1];
  if (f[2] == 'U') return [f[0], f[1] - 1];
  if (f[2] == 'L') return [f[0] - 1, f[1]];
  if (f[2] == 'R') return [f[0] + 1, f[1]];
};

var fliesInfo = [[1,49,"X"],[2,48,"D"],[3,48,"D"],[4,48,"D"],[5,48,"D"],[6,48,"D"],[7,48,"D"],[8,48,"D"],[9,48,"D"],[10,48,"D"],[11,46,"D"],[10,46,"D"],[9,46,"D"],[8,46,"D"],[7,46,"D"],[6,46,"D"],[5,46,"D"],[4,46,"D"],[3,46,"D"],[2,46,"D"],[1,46,"D"],[0,44,"D"],[1,44,"D"],[2,44,"D"],[3,44,"D"],[4,44,"D"],[5,44,"D"],[6,44,"D"],[7,44,"D"],[8,44,"D"],[9,44,"D"],[10,44,"D"],[11,42,"D"],[10,42,"D"],[9,42,"D"],[8,42,"D"],[7,42,"D"],[6,42,"D"],[5,42,"D"],[4,42,"D"],[3,42,"D"],[2,42,"D"],[1,42,"D"],[0,40,"D"],[1,40,"D"],[2,40,"D"],[3,40,"D"],[4,40,"D"],[5,40,"D"],[6,40,"D"],[7,40,"D"],[8,40,"D"],[9,40,"D"],[10,40,"D"],[11,38,"D"],[10,38,"D"],[9,38,"D"],[8,38,"D"],[7,38,"D"],[6,38,"D"],[5,38,"D"],[4,38,"D"],[3,38,"D"],[2,38,"D"],[1,38,"D"],[0,36,"D"],[1,36,"D"],[2,36,"D"],[3,36,"D"],[4,36,"D"],[5,36,"D"],[6,36,"D"],[7,36,"D"],[8,36,"D"],[9,36,"D"],[10,36,"D"],[11,34,"D"],[10,34,"D"],[9,34,"D"],[8,34,"D"],[7,34,"D"],[6,34,"D"],[5,34,"D"],[4,34,"D"],[3,34,"D"],[2,34,"D"],[1,34,"D"],[0,32,"D"],[1,32,"D"],[2,32,"D"],[3,32,"D"],[4,32,"D"],[5,32,"D"],[6,32,"D"],[7,32,"D"],[8,32,"D"],[9,32,"D"],[10,32,"D"],[11,30,"D"],[10,30,"D"],[9,30,"D"],[8,30,"D"],[7,30,"D"],[6,30,"D"],[5,30,"D"],[4,30,"D"],[3,30,"D"],[2,30,"D"],[1,30,"D"],[0,28,"D"],[1,28,"D"],[2,28,"D"],[3,28,"D"],[4,28,"D"],[5,28,"D"],[6,28,"D"],[7,28,"D"],[8,28,"D"],[9,28,"D"],[10,28,"D"],[11,26,"D"],[10,26,"D"],[9,26,"D"],[8,26,"D"],[7,26,"D"],[6,26,"D"],[5,26,"D"],[4,26,"D"],[3,26,"D"],[2,26,"D"],[1,26,"D"],[0,24,"D"],[1,24,"D"],[2,24,"D"],[3,24,"D"],[4,24,"D"],[5,24,"D"],[6,24,"D"],[7,24,"D"],[8,24,"D"],[9,24,"D"],[10,24,"D"],[11,22,"D"],[10,22,"D"],[9,22,"D"],[8,22,"D"],[7,22,"D"],[6,22,"D"],[5,22,"D"],[4,22,"D"],[3,22,"D"],[2,22,"D"],[1,22,"D"],[0,20,"D"],[1,20,"D"],[2,20,"D"],[3,20,"D"],[4,20,"D"],[5,20,"D"],[6,20,"D"],[7,20,"D"],[8,20,"D"],[9,20,"D"],[10,20,"D"],[11,18,"D"],[10,18,"D"],[9,18,"D"],[8,18,"D"],[7,18,"D"],[6,18,"D"],[5,18,"D"],[4,18,"D"],[3,18,"D"],[2,18,"D"],[1,18,"D"],[0,16,"D"],[1,16,"D"],[2,16,"D"],[3,16,"D"],[4,16,"D"],[5,16,"D"],[6,16,"D"],[7,16,"D"],[8,16,"D"],[9,16,"D"],[10,16,"D"],[11,14,"D"],[10,14,"D"],[9,14,"D"],[8,14,"D"],[7,14,"D"],[6,14,"D"],[5,14,"D"],[4,14,"D"],[3,14,"D"],[2,14,"D"],[1,14,"D"],[0,12,"D"],[1,12,"D"],[2,12,"D"],[3,12,"D"],[4,12,"D"],[5,12,"D"],[6,12,"D"],[7,12,"D"],[8,12,"D"],[9,12,"D"],[10,12,"D"],[11,10,"D"],[10,10,"D"],[9,10,"D"],[8,10,"D"],[7,10,"D"],[6,10,"D"],[5,10,"D"],[4,10,"D"],[3,10,"D"],[2,10,"D"],[1,10,"D"],[0,8,"D"],[1,8,"D"],[2,8,"D"],[3,8,"D"],[4,8,"D"],[5,8,"D"],[6,8,"D"],[7,8,"D"],[8,8,"D"],[9,8,"D"],[10,8,"D"],[11,6,"D"],[10,6,"D"],[9,6,"D"],[8,6,"D"],[7,6,"D"],[6,6,"D"],[5,6,"D"],[4,6,"D"],[3,6,"D"],[2,6,"D"],[1,6,"D"],[0,4,"D"],[1,4,"D"],[2,4,"D"],[3,4,"D"],[4,4,"D"],[5,4,"D"],[6,4,"D"],[7,4,"D"],[8,4,"D"],[9,4,"D"],[10,4,"D"],[11,2,"D"],[10,2,"D"],[9,2,"D"],[8,2,"D"],[7,2,"D"],[6,2,"D"],[5,2,"D"],[4,2,"D"],[3,2,"D"],[2,2,"D"],[1,2,"D"],[0,0,"D"],[1,0,"D"],[2,0,"D"],[3,0,"D"],[4,0,"D"],[5,0,"D"],[6,0,"D"],[7,0,"D"],[8,0,"D"],[9,0,"D"],[10,0,"D"],[11,0,"D"]];

if (fliesInfo.length == 0) {
  for (var y = level.height - 2; y >= 0; y = y - 2) {
    if ((level.height-2-y) / 2 % 2 == 0) {
      if (y == level.height - 2) {
        fliesInfo.push([1, level.height-1, 'X']);
      } else {
        fliesInfo.push([0, y, 'D']);
        fliesInfo.push([1, y, 'D']);
      }
      for (var x = 2; x < level.width - 1; x++) {
        fliesInfo.push([x, y, 'D']);
      }
      if (y == 0)
        fliesInfo.push([level.width - 1, 0, 'D']);
    } else {
      for (var x = level.width - 1; x > 0; x--) {
        fliesInfo.push([x, y, 'D']);
      }
      if (y == 0)
        fliesInfo.push([0, 0, 'D']);
    }
  }

  var blob = new Blob([JSON.stringify(fliesInfo)]);
  saveAs(blob, "cooperation2.json");
  var input = "";
  input = input.concat("{0} {1}\n".format(level.width, level.height));
  input = input.concat("{0} {1}\n".format(level.frog.x, level.frog.y));
  input = input.concat("{0}\n".format(fliesInfo.length));
  for (var i = 0; i < fliesInfo.length; i++)
    input = input.concat("{0} {1} {2}\n".format(fliesInfo[i][0], fliesInfo[i][1], fliesInfo[i][2]));
  saveAs(new Blob([input]), "cooperation2.txt");
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
