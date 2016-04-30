(function () {
/***************************************/
/*      Maximize Function (level 2)    */
/***************************************/
var maximizeFunction = 
  {
    name   : 'Maximize Zone Level 2',
    width  : 2048,
    height : 3,
    frog : {
      x : 1,
      y : 1,
      range : 0,
    },
    flies : [],
    walls: [],
    scoreFunction : function (flies, moves) {
      return flies*Math.pow(2, -moves/2048);
    }
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
