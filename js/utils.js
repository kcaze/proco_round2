if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
      ? args[number]
      : match
      ;
    });
  };
}

function saveAsText(s) {
  var blob = new Blob([s], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "out.txt");
}

function exportLevel(l) {
  var s = l.width.toString() + " " + l.height.toString() + "\n";
  s += l.frog.x.toString() + " " + l.frog.y.toString() + "\n";
  var w = [];
  for (var ii = 0; ii < l.height; ii++) {
    for (var jj = 0; jj < l.width; jj++) {
      if (l.walls[ii][jj]) {
        w.push([jj, ii]);
      }
    }
  }
  s += w.length.toString() + "\n";
  for (var ii = 0; ii < w.length; ii++) {
    s += w[ii][0].toString() + " " + w[ii][1].toString() + "\n";
  }
  s += l.flies.length.toString() + "\n";
  for (var ii = 0; ii < l.flies.length; ii++) {
    s += l.flies[ii].x.toString() + " " + l.flies[ii].y.toString() + "\n";
  }
  saveAsText(s);
}

function exportPeriodicity2(l) {
  var s = l.width.toString() + " " + l.height.toString() + "\n";
  s += l.frog.x.toString() + " " + l.frog.y.toString() + "\n";
  var w = [];
  for (var ii = 0; ii < l.height; ii++) {
    for (var jj = 0; jj < l.width; jj++) {
      if (l.walls[ii][jj]) {
        w.push([jj, ii]);
      }
    }
  }
  s += w.length.toString() + "\n";
  for (var ii = 0; ii < w.length; ii++) {
    s += w[ii][0].toString() + " " + w[ii][1].toString() + "\n";
  }
  s += l.flies.length.toString() + "\n";
  for (var ii = 0; ii < l.flies.length; ii++) {
    var period = 2*(ii%3) + 2;
    var dir = ii%2 == 1 ? 'D' : 'U';
    var dir_ = ii%2 == 1 ? 'U' : 'D';
    s += l.flies[ii].x.toString() + " " + l.flies[ii].y.toString() + " " + (2*period).toString() + "\n";
    for (var jj = 0; jj < period; jj++) {
      s += dir + " ";
    }
    for (var jj = 0; jj < period-1; jj++) {
      s += dir_ + " ";
    }
    s += dir_ + "\n";
  }
  saveAsText(s);
}

function exportPeriodicity3(l) {
  var s = l.width.toString() + " " + l.height.toString() + "\n";
  s += l.frog.x.toString() + " " + l.frog.y.toString() + "\n";
  var w = [];
  for (var ii = 0; ii < l.height; ii++) {
    for (var jj = 0; jj < l.width; jj++) {
      if (l.walls[ii][jj]) {
        w.push([jj, ii]);
      }
    }
  }
  s += w.length.toString() + "\n";
  for (var ii = 0; ii < w.length; ii++) {
    s += w[ii][0].toString() + " " + w[ii][1].toString() + "\n";
  }
  s += l.flies.length.toString() + "\n";
  var dirs = ["L U R D\n", "U R D L\n", "R D L U\n", "D L U R\n"];
  for (var ii = 0; ii < l.height/2 - 1; ii++) {
    for (var jj = 0; jj < l.width/2 - 1; jj++) {
      var d = dirs[(ii+jj)%4];
      var f = l.flies[jj+ii*(Math.floor(l.width/2)-1)];
      s += f.x.toString() + " " + f.y.toString() + " 4\n";
      s += d;
    }
  }
  saveAsText(s);
}
