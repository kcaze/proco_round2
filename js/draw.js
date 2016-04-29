var wallColor = "#a020f0";
var tileColor = "#226";

var drawLevelCanvas = (function() {

var consts = {
  GRID_SIZE : 32,
};

var entities = {
  frog_l : loadImage('img_frog_l'),
  frog_u : loadImage('img_frog_u'),
  frog_r : loadImage('img_frog_r'),
  frog_d : loadImage('img_frog_d'),
  fly_l : loadImage('img_fly_l'),
  fly_u : loadImage('img_fly_u'),
  fly_r : loadImage('img_fly_r'),
  fly_d : loadImage('img_fly_d')
};

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

function loadImage(i) {
  return document.getElementById(i);
}

function drawEntity(e, dir, x, y, level) {
  dir = dir || 'd';
  ctx.drawImage(entities[e + '_' + dir],
                consts.GRID_SIZE * x - consts.GRID_SIZE*level.frog.shiftx,
                consts.GRID_SIZE * y - consts.GRID_SIZE*level.frog.shifty);
}

function drawGrid(level) {
  for (var xx = 0; xx < level.width; xx++) {
    for (var yy = 0; yy < level.height; yy++) {
      ctx.fillStyle = level.walls[yy][xx] ? wallColor : tileColor;
      ctx.fillRect(xx*consts.GRID_SIZE + 1 - consts.GRID_SIZE*level.frog.shiftx,
                   yy*consts.GRID_SIZE + 1 - consts.GRID_SIZE*level.frog.shifty,
                   consts.GRID_SIZE - 2, consts.GRID_SIZE-2);
    }
  }
}

document.getElementById('tileColor').addEventListener('change', function() {
  tileColor = document.getElementById('tileColor').value;
});
document.getElementById('wallColor').addEventListener('change', function() {
  wallColor = document.getElementById('wallColor').value;
});

return function (level) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // update frog shift
  if (level.frog.x > level.frog.shiftx + 12) {
    level.frog.shiftx = level.frog.x - 12;
  } else if (level.frog.x < level.frog.shiftx + 2) {
    level.frog.shiftx = level.frog.x - 2;
  }
  if (level.frog.y > level.frog.shifty + 12) {
    level.frog.shifty = level.frog.y - 12;
  } else if (level.frog.y < level.frog.shifty + 2) {
    level.frog.shifty = level.frog.y - 2;
  }
  level.frog.shiftx = Math.max(0, Math.min(level.frog.shiftx, level.width - 15));
  level.frog.shifty = Math.max(0, Math.min(level.frog.shifty, level.height - 15));
  drawGrid(level);
  drawEntity('frog', level.frog.direction, level.frog.x, level.frog.y, level);
  level.flies.forEach(function(fly) {
    drawEntity('fly', fly.direction, fly.x, fly.y, level);
  });
};

})();

