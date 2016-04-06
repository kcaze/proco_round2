var currentLevel;
var moves;

// Generate level buttons
function generateLevelButtons() {
  var levelDiv = document.getElementById('levels');

  function onclick(e) {
    for (var ii = 0; ii < levelDiv.children.length; ii++) {
      levelDiv.children[ii].className = 'btn btn-default';
    }
    e.target.className = 'btn btn-default active';

    currentLevel = game.initializeLevel(e.target.level);
    drawLevelCanvas(currentLevel);
  }

  for (var ii = 0; ii < game.levels.length; ii++) {
    var level = game.levels[ii];
    var button = document.createElement('button');
    button.type = 'button';
    button.id = 'level' + ii.toString(10);
    button.className = 'btn btn-default';
    button.innerHTML = level.name;
    button.level = level;
    button.addEventListener('click', onclick);
    levelDiv.appendChild(button);
  }
}

// Draw

generateLevelButtons();


/*
        <div class="btn-group-vertical center-block">


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

function resetLevel() {
  loadLevel(levels[currentLevel.name]);
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

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!currentLevel) return;
  drawGrid();
  drawEntities();
}

function clickLog() {
  document.getElementById('log').click();
}

function readLog(logElement) {
  var file = logElement.files[0];
  var fileReader = new FileReader();
  fileReader.onload = function (e) {
    logElement.value = '';
    var log = e.target.result;
    // TODO: Does the log file need to be sanitized in some way?
    log = log.trim();
    resetLevel();
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

for (var level in levels) activateLevelButton(level)

document.addEventListener('keydown', function (e) {
  var keys = { 37:'left', 38:'up', 39:'right', 40:'down' };

  if (!keys[e.keyCode]) return;

  step(keys[e.keyCode]);
  e.preventDefault();
  e.stopPropagation();
});

loadLevel(levels.level1);
window.setInterval(draw, 1000/consts.FPS);*/
