(function () {
/***************************/
/*      Ice Emulation      */
/***************************/
var n = 79;
var moveFn = function(level) {
  return {x:this.x, y:this.y};
};
var ice = 
  {
    name   : 'Ice Zone Level 2',
    width  : n,
    height : n,
    frog : {
      x : Math.floor(n/2),
      y : 1,
      range : 0,
      moveFrog : function (level, dx, dy) {
        while (!level.walls[level.frog.y+dy][level.frog.x+dx]) {
          level.frog.x += dx;
          level.frog.y += dy;
        }
      }
    },
    flies : [],
    walls: [],
    scoreFunction : function (flies, moves) {
      return (flies*flies)/(moves+1);
    }
  }

for (var ii = 0; ii < n; ii++) {
  ice.walls.push({x:ii, y:0});
  ice.walls.push({x:ii, y:n-1});
}
for (var ii = 1; ii < n-1; ii++) {
  ice.walls.push({x:0, y:ii});
  ice.walls.push({x:n-1, y:ii});
}

for (var ii = 1; ii <= n/4; ii++) {
  for (var jj = 2*ii; jj < n - 2*ii; jj++) {
    if (ii%4 != 0 || jj != Math.floor(n/2)) {
      ice.walls.push({x:jj, y:2*ii});
    }
    if (ii%4 != 2 || jj != Math.floor(n/2)) {
      ice.walls.push({x:jj, y:n-1-2*ii});
    }
    if (ii%4 != 1 || jj != Math.floor(n/2)) {
      ice.walls.push({x:2*ii, y:jj});
    }
    if (ii%4 != 3 || jj != Math.floor(n/2)) {
      ice.walls.push({x:n-1-2*ii, y:jj});
    }
  }

  if (ii%4 == 0) {
    ice.walls.push({x:Math.floor(n/2)+1, y:2*ii-1});
    ice.flies.push({x:Math.floor(n/2)+2, y:2*ii-1, move:moveFn});
  } else if (ii%4 == 2) {
    ice.walls.push({x:Math.floor(n/2)-1, y:n-1-2*ii+1});
    ice.flies.push({x:Math.floor(n/2)-2, y:n-1-2*ii+1, move:moveFn});
  } else if (ii%4 == 1) {
    ice.walls.push({x:2*ii-1, y:Math.floor(n/2)-1});
    ice.flies.push({x:2*ii-1, y:Math.floor(n/2)-2, move:moveFn});
  } else {
    ice.walls.push({x:n-1-2*ii+1, y:Math.floor(n/2)+1});
    ice.flies.push({x:n-1-2*ii+1, y:Math.floor(n/2)+2, move:moveFn});
  }
  ice.flies.push({x:Math.floor(n/2), y:Math.floor(n/2), move:moveFn});
}
game.levels.push(ice);
})();
