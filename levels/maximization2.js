(function () {
/***************************************/
/*      Maximize Function (level 2)    */
/***************************************/
var maximizeFunction = 
  {
    name   : 'Maximization Zone Level 2',
    width  : 2050,
    height : 3,
    frog : {
      x : 1,
      y : 1,
      range : 0,
    },
    flies : [],
    walls: [],
    scoreFunction : function (spiders, moves) {
      return spiders*Math.pow(2, -moves/2048);
    },
    targetScore: 7.57
  }

for (var ii = 0; ii < maximizeFunction.width; ii++) {
  maximizeFunction.walls.push({x:ii, y:0});
  maximizeFunction.walls.push({x:ii, y:2});
}
maximizeFunction.walls.push({x:0, y:1});
maximizeFunction.walls.push({x:maximizeFunction.width-1, y:1});
for (var ii = 1; ii < Math.log2(maximizeFunction.width); ii++) {
  maximizeFunction.flies.push({
    x : (1 << ii),
    y : 1,
    move : function (level) {
      return {x:this.x, y:this.y};
    }
  });
}
game.levels.push(maximizeFunction);
})();
