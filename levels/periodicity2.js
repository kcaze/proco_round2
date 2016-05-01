(function () {
/************************/
/*      Periodic        */
/************************/
var trafficLight = 
  {
    name   : 'Periodicity Zone Level 2',
    width  : 100,
    height : 13,
    frog : {
      x : 1,
      y : 6,
      range : 0,
    },
    flies : [],
    walls: [],
    scoreFunction : function (flies, moves, waits) {
      return 5*flies - moves;
    }
  }
function trafficLightFly(period,dir,x,y) {
  return {
    dir:dir,
    curr:0,
    period:period,
    direction:dir == 1 ? 'd' : 'u',
    x:x,
    y:y,
    move:function (level) {
      if (this.curr >= this.period) {
        this.dir *= -1;
        this.curr = 0;
      }
      this.curr++;
      return {x:this.x, y:this.y+this.dir};
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
for (var ii = 2; ii < trafficLight.width-1; ii++) {
  var period = 2*((ii-2)%3)+2;
  var dir = ii%2 == 1 ? 1 : -1;
  trafficLight.flies.push(trafficLightFly(period, dir, ii, 6+period*(-dir)/2));
}
game.levels.push(trafficLight);
})();
