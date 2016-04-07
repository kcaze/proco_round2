var drawLevelCanvas = (function() {

var consts = {
  GRID_SIZE : 32,
};

var entities = {
  frog : loadImage('img_frog'),
  fly : loadImage('img_fly'),
};

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

function loadImage(i) {
  return document.getElementById(i);
}

function drawEntity(e, x, y) {
  ctx.drawImage(entities[e], consts.GRID_SIZE * x, consts.GRID_SIZE * y);
}

function drawGrid(level) {
  for (var ii = 0; ii < level.width; ii++) {
    for (var jj = 0; jj < level.height; jj++) {
      ctx.fillStyle = "green";
      ctx.fillRect(ii*consts.GRID_SIZE + 1, jj*consts.GRID_SIZE + 1,
                   consts.GRID_SIZE - 2, consts.GRID_SIZE-2);
    }
  }
}

return function (level) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawGrid(level);
  drawEntity('frog', level.frog.x, level.frog.y);
  level.flies.forEach(function(fly) {
    drawEntity('fly', fly.x, fly.y);
  });
};

})();

