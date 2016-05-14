(function () {
var exampleLevel = 
  {
    // Level name
    name   : 'Example Level',
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
      return flies / (moves + 1);
    },
    targetScore: 0.125,
  };

var exampleFly = {
  // Fly's initial x position
  x : 1,
  // Fly's initial y position
  y : 1,
  dx : [0, 1, 1, 0, 0, -1, -1, 0],
  dy : [-1, 0, 0, 1, -1, 0, 0, 1],
  // Function to compute fly's next position, taking in the current level object
  move : function (level) {
    return {x : this.x + this.dx[level.moves % this.dx.length],
            y : this.y + this.dy[level.moves % this.dy.length]};
  },
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
exampleLevel.walls.push({x:1,y:2});
exampleLevel.walls.push({x:2,y:1});
exampleLevel.walls.push({x:3,y:2});

game.levels.push(exampleLevel);
})();
