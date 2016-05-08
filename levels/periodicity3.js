(function () {
/************************/
/*      Periodic        */
/************************/
var trafficLight = 
  {
    name   : 'Periodicity Zone Level 3',
    width  : 100,
    height : 100,
    frog : {
      x : 1,
      y : 1,
      range : 0,
    },
    flies : [],
    walls: [],
    scoreFunction : function (spiders, moves, waits) {
      return 4*spiders - moves;
    }
  }
function trafficLightFly(dir,x,y) {
  var ii = {'right':0,'down':1,'left':2,'up':3};
  var dx = [1,0,-1,0];
  var dy = [0,1,0,-1];
  var dd = ['down','left','up','right'];
  return {
    dir:dir,
    direction:dir[0],
    x:1+2*x+[0,1,1,0][ii[dir]],
    y:1+2*y+[0,0,1,1][ii[dir]],
    move:function (level) {
      var ret = {x:this.x+dx[ii[this.dir]], y:this.y+dy[ii[this.dir]]};
      this.dir = dd[ii[this.dir]];
      return ret;
    }
  };
}
for (var ii = 0; ii < trafficLight.width; ii++) {
  trafficLight.walls.push({x:ii, y:0});
  trafficLight.walls.push({x:ii, y:trafficLight.height-1});
}
for (var ii = 1; ii < trafficLight.height-1; ii++) {
  trafficLight.walls.push({x:0, y:ii});
  trafficLight.walls.push({x:trafficLight.width-1, y:ii});
}
var directions = ['left', 'up', 'right', 'down'];
for (var ii = 0; ii < trafficLight.width/2 - 1; ii++) {
  for (var jj = 0; jj < trafficLight.height/2 - 1; jj++) {
    trafficLight.flies.push(trafficLightFly(directions[(ii+jj)%4], ii, jj));
  }
}
game.levels.push(trafficLight);
})();
