var currentLevel;
var log;
var logNum;

// Generate level buttons
(function () {
  var levelDiv = document.getElementById('levels');

  function onclick(e) {
    for (var ii = 0; ii < levelDiv.children.length; ii++) {
      levelDiv.children[ii].className = 'btn btn-default';
    }
    e.target.className = 'btn btn-default active';

    currentLevel = game.initializeLevel(e.target.level);
    setLog([]);
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
})();

// Keyboard controls
document.addEventListener('keydown', function (e) {
  var keys = { 37:'left', 38:'up', 39:'right', 40:'down' };

  if (!keys[e.keyCode]) return;

  pushLog(keys[e.keyCode]);
  e.preventDefault();
  e.stopPropagation();
});

// Log functions
function pushLog(move) {
  log.push(move);
  setLog(log);
}

function popLog() {
  log.pop();
  setLog(log);
}

function setLog(newLog, newLogNum) {
  log = newLog
  logNum = newLogNum || log.length;

  currentLevel.runLog(log, logNum);

  // Update view
  drawLevelCanvas(currentLevel);
  document.getElementById('moves').innerHTML = currentLevel.moves;
  document.getElementById('fliesCaught').innerHTML = currentLevel.fliesCaught;
  document.getElementById('score').innerHTML = currentLevel.score;
  document.getElementById('scoreFunction').innerHTML = currentLevel.scoreFunction.toString();
  var recentMoves = log.slice(Math.max(log.length-5, 0)).join('<br>');
  document.getElementById('recentMoves').innerHTML = recentMoves;

  document.getElementById('currentMove').innerHTML = logNum;
  document.getElementById('numMoves').innerHTML = log.length;
  document.getElementById('moveBar').max = log.length;
  document.getElementById('moveBar').value = logNum;
}

function readLog(logElement) {
  var file = logElement.files[0];
  var fileReader = new FileReader();
  fileReader.onload = function (e) {
    logElement.value = '';
    // TODO: Does the log file need to be sanitized in some way?
    setLog(e.target.result.trim().split(/\s+/));
  };
  fileReader.readAsText(file)
}

function exportLog() {
  var logString = log.join('\n');
  var blob = new Blob([logString], {type:'text/plain;charset=utf-8'});
  saveAs(blob, 'catching_flies_' + currentLevel.name + '_log.txt');
}

// Movebar code
function updateMove() {
  // Dummied out. This is called when the user releases the mouse on the movebar.
}

function updateMoveBar() {
  setLog(log, document.getElementById('moveBar').value);
}
