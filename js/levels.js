game.levels = [];
(function () {

/***************************************/
/*         Intro (level 1)             */
/***************************************/
game.levels.push(
  {
    name   : 'Intro',
    width  : 5,
    height : 5,
    frog : {
      x : 2,
      y : 2,
      range : 1,
    },
    flies : [
      {x:0,y:0,move:function() { return {x:0, y:0}; }},
      {x:4,y:0,move:function() { return {x:4, y:0}; }},
      {x:0,y:4,move:function() { return {x:0, y:4}; }},
      {x:4,y:4,move:function() { return {x:4, y:4}; }}
    ],
    walls: [
      {x:1,y:0},
      {x:4,y:1},
      {x:3,y:4},
      {x:0,y:3},
    ],
    scoreFunction : function (flies, moves) {
      return (flies*flies)/(moves+1);
    }
  }
);

/***************************************/
/*      Traffic Light (level 2)        */
/***************************************/
var trafficLight = 
  {
    name   : 'Traffic Light',
    width  : 12,
    height : 9,
    frog : {
      x : 5,
      y : 7,
      range : 1,
    },
    flies : [],
    walls: [
      {x:1,y:1}, {x:2,y:1}, {x:9,y:1},{x:10,y:1},
      {x:5,y:2}, {x:6,y:2}, {x:7,y:2},
      {x:1,y:3}, {x:4,y:3}, {x:5,y:3},
      {x:1,y:4}, {x:2,y:4}, {x:10,y:4},
      {x:1,y:5}, {x:2,y:5}, {x:3,y:5}, {x:9,y:5}, {x:10,y:5},
      {x:7,y:6}, {x:8,y:6}, {x:9,y:6}, {x:10,y:6},
    ],
    scoreFunction : function (flies, moves) {
      return flies/(moves+1);
    }
  }
function trafficLightFly(dir,x,y) {
  return {
    dir:dir,
    x:x,
    y:y,
    move:function (level) {
      var x = this.x + dir;
      if (level.walls[y][x]) {
        dir *= -1;
        x = this.x + dir;
      }
      return {x:x, y:this.y};
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
for (var ii = 1; ii < trafficLight.width-1; ii++) {
  if (ii == 5) continue;
  trafficLight.walls.push({x:ii, y:trafficLight.height-2});
}
trafficLight.flies = [
  trafficLightFly(1,3,1), trafficLightFly(1,1,2),
  trafficLightFly(-1,10,2), trafficLightFly(1,2,3),
  trafficLightFly(1,6,3), trafficLightFly(-1,6,4),
  trafficLightFly(-1,8,5), trafficLightFly(1,1,6),
]
game.levels.push(trafficLight);

})()

