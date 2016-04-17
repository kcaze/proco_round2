(function () {
/***************************/
/*      Ice Emulation      */
/***************************/
var ice = 
  {
    name   : 'Ice Puzzle',
    width  : 17,
    height : 12,
    frog : {
      x : 1,
      y : 1,
      range : 1,
      moveFrog : function (level, dx, dy) {
        while (!level.walls[level.frog.y+dy][level.frog.x+dx]) {
          level.frog.x += dx;
          level.frog.y += dy;
        }
      }
    },
    flies : [{x:11, y:4, move: function() {return {x:this.x, y:this.y};}}],
    walls: [
      {x:6,y:1}, {x:7,y:1}, {x:4,y:3}, {x:9,y:3},
      {x:11,y:3}, {x:12,y:3}, {x:15,y:3}, {x:12,y:4},
      {x:3,y:5}, {x:8,y:5}, {x:8,y:6}, {x:13,y:6},
      {x:5,y:7}, {x:14,y:8}, {x:15,y:9}
    ],
    scoreFunction : function (flies, moves) {
      return flies/(moves+1);
    }
  }

for (var ii = 0; ii < ice.width; ii++) {
  ice.walls.push({x:ii, y:0});
  ice.walls.push({x:ii, y:ice.height-1});
}
for (var ii = 1; ii < ice.height-1; ii++) {
  ice.walls.push({x:0, y:ii});
  ice.walls.push({x:ice.width-1, y:ii});
}
game.levels.push(ice);
})();
