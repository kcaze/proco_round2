(function () {
/***************************************/
/*      Maximize Function (level 2)    */
/***************************************/
var maximizeFunction = 
  {
    name   : 'Maximization Zone Level 3',
    width  : 6,
    height : 6,
    frog : {
      x : 1,
      y : 1,
      range : 0,
    },
    flies : [],
    walls: [],
    scoreFunction : function (spiders, moves) {
      var mod = Math.floor(Math.pow(2, spiders));
      var x = moves%mod + mod;
      return Math.tan(x);
    }
  }

function flymove() { return {x:this.x, y:this.y}; }

for (var ii = 0; ii < maximizeFunction.width; ii++) {
  maximizeFunction.walls.push({x:ii, y:0});
  maximizeFunction.walls.push({x:ii, y:5});
  maximizeFunction.walls.push({x:0, y:ii});
  maximizeFunction.walls.push({x:5, y:ii});
}
for (var ii = 1; ii < 5; ii++) {
  maximizeFunction.flies.push({x:ii, y:2, move:flymove});
  maximizeFunction.flies.push({x:ii, y:3, move:flymove});
  maximizeFunction.flies.push({x:ii, y:4, move:flymove});
}
maximizeFunction.flies.push({x:2, y:1, move:flymove});
maximizeFunction.flies.push({x:3, y:1, move:flymove});
maximizeFunction.flies.push({x:4, y:1, move:flymove});
game.levels.push(maximizeFunction);
})();
