(function () {
/***************************************/
/*      Maximize Function (level 2)    */
/***************************************/
var maximizeFunction = 
  {
    name   : 'Maximization Zone Level 1',
    width  : 102,
    height : 3,
    frog : {
      x : 1,
      y : 1,
      range : 0,
    },
    flies : [],
    walls: [],
    scoreFunction : function (spiders, moves) {
      var x = 2*spiders - moves;
      return -(x*x) + 144*x + 10;
    }
  }

for (var ii = 0; ii < maximizeFunction.width; ii++) {
  maximizeFunction.walls.push({x:ii, y:0});
  maximizeFunction.walls.push({x:ii, y:2});
}
maximizeFunction.walls.push({x:0, y:1});
maximizeFunction.walls.push({x:maximizeFunction.width-1, y:1});
for (var ii = 2; ii < maximizeFunction.width-1; ii++) {
  maximizeFunction.flies.push({
    x : ii,
    y : 1,
    move : function (level) {
      return {x:this.x, y:this.y};
    }
  });
}
game.levels.push(maximizeFunction);
})();
