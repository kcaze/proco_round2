var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var consts = {
  GRID_SIZE : 32,
  FPS : 60
}

var frog_prototype = {
  left : loadImage('img_frog_l'),
  up : loadImage('img_frog_u'),
  right : loadImage('img_frog_r'),
  down : loadImage('img_frog_d'),
  image : 'up',
};

var levels = {
  level1 : {
              name   : 'level1',
              width  : 5,
              height : 5,
              frog_x : 2,
              frog_y : 2
           },
  level2 : {
              name   : 'level2',
              width  : 10,
              height : 3,
              frog_x : 0,
              frog_y : 0
           },
  level3 : {
              name   : 'level3',
              width  : 11,
              height : 11,
              frog_x : 5,
              frog_y : 5
           },
  level4 : {
              name   : 'level4',
              width  : 11,
              height : 11,
              frog_x : 5,
              frog_y : 5
           },
  level5 : {
              name   : 'level5',
              width  : 11,
              height : 11,
              frog_x : 5,
              frog_y : 5
           },
};

var currentLevel;

function loadImage(i) {
  return document.getElementById(i);
}

function drawEntity(e) {
  ctx.drawImage(e[e.image], consts.GRID_SIZE * e.x, consts.GRID_SIZE * e.y);
}

function moveFrog(dir) {
  var frog = currentLevel.frog;
  var d = { left:0, up:1, right:2, down:3 }[dir];
  var dx = [-1, 0, 1, 0][d];
  var dy = [0, -1, 0, 1][d];

  frog.image = dir;
  frog.x = Math.min(currentLevel.width - 1, Math.max(0, frog.x + dx));
  frog.y = Math.min(currentLevel.height - 1, Math.max(0, frog.y + dy));
}

function activateLevelButton(level) {
  var levelElement = document.getElementById(level);
  levelElement.addEventListener('click', function (e) {
    for (var level_ in levels) {
      document.getElementById(level_).className = 'btn btn-default';
    }
    e.target.className = 'btn btn-primary active';
    loadLevel(levels[level]);
  });
}

function loadLevel(level) {
  currentLevel = Object.create(level);
  currentLevel.log = [];
  currentLevel.frog = Object.create(frog_prototype);
  currentLevel.frog.x = level.frog_x;
  currentLevel.frog.y = level.frog_y;
}

function drawEntities() {
  drawEntity(currentLevel.frog);
}

function drawGrid() {
  for (var ii = 0; ii < currentLevel.width; ii++) {
    for (var jj = 0; jj < currentLevel.height; jj++) {
      ctx.fillStyle = "green";
      ctx.fillRect(ii*consts.GRID_SIZE + 1, jj*consts.GRID_SIZE + 1,
                   consts.GRID_SIZE - 2, consts.GRID_SIZE-2);
    }
  }
}

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!currentLevel) return;
  drawGrid();
  drawEntities();
}

function readLog(file) {
  var fileReader = new FileReader();
  fileReader.onload = function (e) {
    var log = e.target.result;
    // TODO: Does the log file need to be sanitized in some way?
    log = log.trim();
    runLog(log);
  };
  fileReader.readAsText(file)
}

function exportLog() {
  var log = currentLevel.log.join('\n');
  var blob = new Blob([log], {type:'text/plain;charset=utf-8'});
  saveAs(blob, 'catching_flies_' + currentLevel.name + '_log.txt');
}

function runLog(log) {
  var lines = log.split(/\s+/);
  lines.forEach(function(line) {
    step(line);
  });
}

function step(input) {
  var validInputs = { left:true, up:true, right:true, down:true };
  if (!validInputs[input]) {
    console.log("Invalid input: " + input);
    return;
  }
  currentLevel.log.push(input);
  moveFrog(input);
}

/*** Main execution ***/
for (var level in levels) activateLevelButton(level)

document.addEventListener('keydown', function (e) {
  var keys = { 37:'left', 38:'up', 39:'right', 40:'down' };

  if (!keys[e.keyCode]) return;

  step(keys[e.keyCode]);
  e.preventDefault();
  e.stopPropagation();
});

loadLevel(levels.level1);
window.setInterval(draw, 1000/consts.FPS);
