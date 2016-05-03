(function () {
/***************************/
/*      Ice Emulation      */
/***************************/
var ice = 
  {
    name   : 'Ice Zone Level 1',
    width  : 16,
    height : 14,
    frog : {
      x : 14,
      y : 12,
      range : 0,
      moveFrog : function (level, dx, dy) {
        while (!level.walls[level.frog.y+dy][level.frog.x+dx]) {
          level.frog.x += dx;
          level.frog.y += dy;
        }
      }
    },
    flies : [{x:1, y:4, move: function() {return {x:this.x, y:this.y};}},
             {x:14, y:8, move: function() {return {x:this.x, y:this.y};}}],
    walls: [
      {x:9,y:1}, {x:4,y:2}, {x:10,y:3}, {x:2,y:4},
      {x:1,y:5}, {x:9,y:5}, {x:14,y:6}, {x:7,y:7},
      {x:3,y:8}, {x:14,y:9}, {x:8,y:10}, {x:6,y:11},
      {x:10,y:11}
    ],
    scoreFunction : function (flies, moves) {
      return Math.pow(flies, 5)/(moves+1);
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
