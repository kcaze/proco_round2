(function () {
var exampleLevel = 
  {
    // Level name
    name   : 'Template Level',
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
      range : 1,
    },
    // List of flies, see below for example fly.
    flies : [],
    // List of walls, see below for example wall.
    walls: [],
    // Objective function, takes in number of flies eaten and moves made
    scoreFunction : function (flies, moves) {
      return moves - flies;
    }
  };

var exampleFly = {
  // Fly's initial x position
  x : 1,
  // Fly's initial y position
  y : 1,
  // Function to compute fly's next position, taking in the current level object
  move : function (level) {
    var x = Math.max(0, Math.min(this.x + this.dx, level.width - 1));
    var y = Math.max(0, Math.min(this.y + this.dy, level.width - 1));
    return {x : x, y : y};
  },
  // You can add any other arbitrary data to the fly object, such as the
  // horizontal speed dx and vertical speed dy.
  dx : 1,
  dy : 2
};

var exampleWall = {
  // Wall's x position
  x : 0,
  // Wall's y position
  y : 0,
  // You can add any other arbitrary data to wall objects
  name : "exampleWall"
};

exampleLevel.flies.push(exampleFly);
exampleLevel.walls.push(exampleWall);

game.levels.push(exampleLevel);
})();
