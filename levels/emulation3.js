(function () {
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
  }
var level = 
  {
    // Level name
    name   : 'Emulation Zone Level 3',
    // Width of level in tiles
    width  : 100,
    // Height of level in tiles
    height : 100,
    // Player properties
    frog : {
      // Player's initial x position
      x : 50,
      // Player's initial y position
      y : 50,
      // Range for player's tongue, computed using Manhattan metric
      range : 0,
    },
    // List of flies, see below for example fly.
    flies : [],
    // List of walls, see below for example wall.
    walls: [],
    // Objective function, takes in number of flies eaten and moves made
    scoreFunction : function (flies, moves, waits) {
      return flies * (0.5 + Math.exp(-moves / 5000) / 2);
    },

    inMap: function(x, y) {
      return x >= 0 && y >= 0 && x < this.width && y < this.height;
    },

    hasWall: function(x, y) {
      return !this.inMap(x, y) || this.walls[y][x];
    },
    
  };
var genFly = function() {
  var x = getRandomInt(0, level.width);
  var y = getRandomInt(0, level.height);
  return [x,y];
};

var wallsInfo = [[94,67],[99,99],[30,77],[57,37],[70,70],[66,69],[45,14],[38,20],[48,63],[7,13],[42,61],[28,79],[94,23],[27,52],[14,44],[52,72],[39,14],[55,30],[66,1],[70,0],[81,56],[96,15],[94,39],[57,46],[61,21],[88,64],[12,31],[27,16],[73,40],[90,31],[45,83],[50,24],[40,68],[62,94],[37,88],[94,21],[97,95],[91,6],[66,27],[96,95],[3,90],[65,9],[43,48],[58,82],[58,16],[89,79],[11,48],[90,39],[17,47],[71,82],[45,7],[68,59],[16,84],[69,33],[4,67],[18,43],[66,4],[20,35],[19,20],[95,51],[3,58],[15,97],[99,96],[40,53],[38,5],[86,99],[57,20],[90,49],[78,28],[69,61],[70,72],[40,19],[8,81],[78,60],[60,13],[0,10],[80,79],[38,84],[59,48],[26,13],[46,76],[59,92],[81,34],[31,55],[30,87],[51,63],[36,53],[2,32],[0,95],[81,46],[29,32],[60,33],[95,15],[34,22],[82,66],[45,31],[49,16],[27,37],[57,87],[53,21],[85,16],[99,75],[8,12],[85,84],[33,6],[25,24],[83,75],[96,55],[35,83],[60,85],[62,80],[93,84],[70,72],[86,17],[64,63],[30,30],[32,44],[62,54],[30,5],[51,7],[40,37],[63,1],[56,88],[99,5],[55,72],[80,99],[75,28],[3,0],[50,61],[7,0],[61,65],[39,67],[20,20],[41,43],[52,58],[29,65],[52,13],[11,30],[23,70],[44,44],[10,12],[76,79],[92,3],[97,68],[66,28],[73,57],[49,2],[24,82],[50,24],[21,21],[54,12],[27,3],[2,41],[55,44],[14,6],[61,66],[79,68],[12,22],[23,98],[70,19],[68,45],[25,32],[72,49],[39,64],[94,79],[14,6],[72,88],[22,61],[60,40],[82,34],[98,9],[29,72],[20,78],[21,89],[86,78],[28,17],[8,13],[10,89],[46,87],[36,52],[43,18],[79,11],[87,30],[60,82],[14,88],[61,76],[31,55],[53,84],[40,48],[44,54],[86,44],[80,89],[35,25],[31,87],[53,19],[25,80],[26,92],[80,64],[29,37],[55,45],[96,30],[78,24],[56,91],[2,90],[17,89],[84,25],[83,4],[2,99],[53,40],[50,22],[0,34],[22,49],[11,3],[57,14],[47,18],[70,99],[19,99],[83,9],[1,99],[43,50],[19,10],[80,35],[65,43],[55,41],[30,20],[47,0],[80,16],[75,99],[67,50],[59,26],[67,56],[57,59],[69,43],[35,59],[86,38],[98,26],[67,70],[52,35],[90,79],[29,73],[96,25],[51,30],[12,68],[49,91],[77,97],[29,83],[24,45],[1,84],[80,3],[50,24],[49,4],[64,22],[60,71],[91,57],[2,62],[77,73],[96,67],[14,94],[31,30],[2,15],[16,61],[84,65],[90,4],[24,13],[92,74],[47,55],[70,12],[66,13],[67,12],[47,94],[3,62],[7,69],[40,6],[53,15],[66,83],[53,11],[34,27],[20,54],[58,35],[40,64],[72,23],[38,39],[39,70],[6,83],[0,2],[6,44],[96,87],[98,62],[75,91],[82,92],[76,93],[97,47],[21,94],[48,53],[42,48],[70,54],[85,42],[99,65],[14,49],[61,45],[13,15],[42,6],[56,99],[84,56],[77,74],[16,62],[3,99],[75,76],[20,92],[97,65],[86,39],[44,91],[55,61],[5,18],[82,22],[33,72],[77,38],[22,84],[3,32],[65,58],[9,35],[86,34],[12,58],[8,55],[77,19],[25,81],[37,85],[48,44],[10,79],[24,97],[11,10],[55,53],[86,27],[15,76],[6,32],[42,6],[21,25],[95,10],[83,80],[60,27],[93,99],[3,61],[79,56],[52,69],[24,7],[0,80],[93,48],[4,58],[44,69],[28,66],[57,73],[87,43],[52,5],[84,94],[36,64],[90,71],[91,47],[42,61],[66,43],[51,99],[72,52],[72,18],[97,76],[74,66],[43,9],[46,1],[77,72],[6,28],[65,61],[44,54],[5,72],[26,37],[88,27],[78,81],[89,48],[76,27],[59,70],[2,79],[81,72],[1,75],[2,57],[8,17],[90,20],[28,83],[2,67],[30,88],[82,1],[77,54],[89,37],[10,28],[31,37],[0,28],[14,58],[86,99],[53,11],[17,87],[54,98],[5,13],[80,90],[36,0],[57,65],[50,61],[41,99],[53,71],[34,35],[91,75],[76,90],[29,37],[19,89],[20,80],[12,79],[87,54],[35,25],[5,82],[48,21],[16,26],[21,16],[0,5],[43,84],[75,95],[1,80],[79,1],[37,68],[60,27],[56,33],[93,53],[13,27],[67,25],[17,25],[29,60],[35,37],[63,51],[58,52],[52,37],[83,40],[10,70],[23,8],[86,44],[38,82],[69,50],[69,69],[63,78],[29,35],[61,42],[24,4],[99,14],[96,96],[76,81],[77,53],[48,5],[76,48],[99,94],[62,15],[61,83],[86,46],[55,75],[45,97],[24,0],[92,0],[35,46],[57,7],[60,47],[69,9],[73,56],[56,26],[7,66],[21,26],[57,57],[28,86],[43,31],[81,95],[7,44],[29,97],[0,91],[2,35],[77,70],[2,17],[97,35],[19,75],[87,75],[55,42],[77,77],[11,88],[98,20],[92,56],[72,37],[7,65],[12,93],[98,66],[61,95],[60,78],[24,93],[46,21],[62,80],[82,60],[75,43],[33,55],[27,5],[87,43],[65,54],[79,14],[82,56],[19,84],[51,7],[98,18],[29,4],[77,55],[32,32],[99,83],[46,86],[31,69],[22,80],[3,77],[16,56],[52,51],[77,27],[65,58],[12,30],[41,34],[76,84],[17,9],[49,79],[60,69],[80,35],[79,41],[66,42],[61,19],[69,30],[1,11],[61,15],[81,41],[17,41],[31,45],[98,40],[26,48],[9,56],[51,62],[40,61],[58,56],[45,87],[69,61],[77,52],[52,49],[22,67],[50,31],[28,93],[74,16],[92,17],[85,37],[20,32],[71,25],[44,9],[20,29],[56,8],[95,36],[50,37],[52,64],[79,98],[24,87],[68,49],[25,28],[87,20],[77,40],[56,57],[61,15],[7,90],[49,81],[86,75],[83,57],[26,7],[41,78],[66,4],[12,92],[94,63],[6,30],[99,67],[15,70],[22,7],[71,32],[75,2],[44,52],[72,76],[14,6],[72,96],[29,65],[85,82],[31,54],[13,65],[0,81],[63,95],[72,57],[29,34],[3,13],[4,65],[16,96],[30,12],[25,99],[7,56],[35,73],[29,3],[84,2],[62,73],[34,40],[20,93],[53,3],[40,5],[73,58],[28,2],[71,52],[75,76],[15,12],[35,83],[4,98],[68,48],[79,1],[93,22],[19,7],[57,82],[49,4],[83,75],[95,78],[49,90],[24,57],[64,76],[61,66],[81,13],[41,50],[30,39],[46,35],[11,9],[97,48],[7,11],[97,70],[90,18],[39,18],[60,16],[69,12],[80,27],[65,85],[29,40],[80,89],[88,41],[44,17],[77,92],[49,89],[65,86],[1,10],[0,56],[2,33],[46,74],[48,50],[59,76],[31,60],[25,74],[70,66],[24,15],[53,71],[71,21],[99,17],[71,51],[2,18],[9,4],[41,40],[45,72],[44,84],[60,55],[6,63],[45,57],[41,21],[18,13],[41,8],[47,69],[31,83],[56,32],[60,94],[28,22],[7,99],[97,36],[20,42],[57,28],[50,15],[78,37],[1,91],[16,70],[59,50],[29,42],[71,38],[13,77],[26,16],[27,7],[67,43],[59,4],[30,44],[5,58],[46,8],[54,47],[28,92],[58,87],[63,59],[19,20],[53,8],[77,28],[70,43],[29,28],[62,79],[17,63],[52,46],[28,66],[39,65],[77,46],[79,62],[34,64],[5,78],[45,62],[81,93],[64,71],[97,52],[23,72],[1,74],[25,12],[51,45],[53,76],[21,75],[88,8],[71,75],[76,16],[46,61],[21,21],[73,19],[6,62],[62,5],[95,83],[55,86],[90,38],[57,26],[88,91],[68,76],[29,42],[77,42],[23,70],[70,51],[89,49],[4,84],[15,11],[5,16],[18,6],[87,3],[79,96],[79,23],[62,30],[58,39],[92,34],[58,43],[70,91],[47,44],[17,0],[82,2],[8,5],[95,46],[16,45],[4,15],[70,74],[31,22],[38,77],[58,11],[10,54],[80,73],[37,90],[64,34],[44,97],[53,10],[89,65],[78,61],[19,66],[35,17],[5,50],[19,70],[95,52],[70,21],[8,0],[67,17],[98,14],[78,5],[18,8],[40,16],[6,88],[56,8],[21,40],[11,18],[63,1],[79,21],[79,52],[16,52],[94,57],[77,76],[41,49],[43,4],[34,60],[56,95],[58,24],[61,18],[63,19],[18,55],[16,92],[62,91],[92,84],[77,27],[53,45],[28,27],[65,11],[60,13],[86,5],[31,1],[55,25],[79,89],[78,41],[90,35],[30,16],[94,86],[92,40],[45,45],[37,4],[25,55],[7,26],[43,52],[63,21],[81,99],[75,3],[98,71],[28,58],[32,1],[31,28],[27,77],[0,27],[49,14],[50,27],[38,62],[25,19],[48,70],[83,70],[94,71],[27,82],[35,16],[74,43],[42,51],[80,3],[57,71],[12,83],[6,76],[87,22],[55,67],[54,3],[68,26],[58,60],[2,65],[14,53],[71,75],[42,3],[10,99],[44,77],[76,13],[97,6],[11,48],[49,50],[48,28],[88,36],[36,98],[90,5],[24,82],[82,9],[25,96],[92,4],[51,30],[9,80],[84,77],[23,94],[3,55],[22,88],[48,78],[25,40],[18,36],[97,20],[88,6],[0,37],[82,48],[87,39],[6,16],[18,41],[82,6],[15,70],[97,2],[59,34],[39,75],[73,73],[13,88],[33,30],[48,67],[11,52],[75,93],[94,63],[77,80],[93,44],[7,47],[42,81],[21,78],[2,14],[36,55],[99,89],[25,10],[97,49],[23,41],[77,32],[74,95],[51,59],[78,72],[35,43],[49,66],[79,64],[5,53],[73,88],[54,94],[83,73],[42,76],[47,20],[37,73],[36,22],[29,36],[69,7],[37,35],[55,18],[3,73],[94,83],[39,73],[0,8],[55,76],[48,34],[52,42],[88,12],[82,65],[1,45],[99,19],[33,15],[33,55],[10,48],[31,48],[35,88],[20,61],[77,2],[18,28],[43,88],[0,78],[11,32],[81,42],[11,87],[33,45],[94,77],[89,88],[27,96],[54,23],[95,33],[5,46],[76,62],[18,62],[58,87],[54,65],[90,45],[14,47],[33,28],[40,68],[72,58],[27,15],[31,21],[2,14],[61,63],[60,6],[25,99],[99,91],[10,27],[77,75],[12,36],[52,55],[94,35],[53,88],[74,46],[52,76],[66,64],[61,21],[8,17],[2,9],[73,40],[25,45],[32,65],[4,74],[91,69],[11,85],[68,38],[63,41],[26,15],[85,33],[3,74],[87,63],[37,78],[2,81],[29,24],[12,40],[39,84],[29,29],[67,27],[70,6],[0,80],[59,10],[59,10],[27,54],[22,53],[69,65],[83,39],[86,69],[23,44],[15,72],[81,38],[18,69],[49,40],[56,2],[78,53],[3,88],[89,23],[78,55],[11,94],[29,82],[54,79],[94,13],[51,97],[46,8],[50,55],[69,7],[5,1],[61,29],[57,80],[8,86],[9,98],[63,61],[45,13],[90,28],[31,16],[74,31],[76,28],[12,0],[56,93],[1,65],[45,79],[24,73],[87,18],[0,10],[83,72],[31,61],[65,8],[20,62],[95,32],[60,76],[19,73],[49,62],[4,95],[70,36],[70,71],[74,95],[7,22],[66,32],[24,47],[76,59],[17,60],[27,62],[14,14],[76,87],[2,59],[24,93],[80,29],[28,88],[50,0],[87,91],[72,50],[95,70],[72,74],[96,83],[65,79],[97,63],[95,19],[26,20],[9,32],[15,31],[52,53],[42,31],[28,25],[78,19],[9,65],[74,34],[9,7],[11,40],[19,89],[21,84],[27,72],[13,49],[48,99],[65,91],[92,46],[12,43],[93,92],[74,16],[4,47],[2,45],[17,5],[72,47],[33,67],[4,78],[15,41],[84,5],[6,66],[49,11],[16,26],[84,73],[29,51],[2,83],[46,99],[91,76],[94,65],[57,50],[68,97],[16,9],[87,17],[62,18],[61,71],[97,83],[34,11],[26,89],[35,47],[52,44],[35,23],[43,54],[93,2],[85,14],[81,67],[10,53],[37,28],[7,59],[14,49],[51,9],[47,15],[98,9],[26,70],[97,95],[90,79],[55,23],[85,72],[84,20],[87,85],[58,54],[12,53],[70,75],[43,88],[32,3],[0,21],[18,70],[54,17],[5,90],[49,28],[15,82],[4,58],[95,29],[75,68],[61,43],[68,80],[61,84],[49,75],[28,95],[55,81],[14,34],[77,71],[52,19],[52,44],[6,20],[7,46],[40,68],[68,36],[5,93],[20,83],[34,81],[3,17],[10,25],[66,14],[58,10],[4,84],[2,16],[96,61],[13,64],[90,5],[24,29],[81,79],[83,9],[56,67],[54,59],[44,68],[77,74],[34,16],[0,83],[0,11],[86,90],[65,64],[40,73],[77,53],[86,43],[38,32],[21,67],[77,44],[79,56],[39,34],[71,89],[99,34],[97,66],[69,60],[28,65],[37,26],[58,90],[12,37],[20,31],[94,6],[68,4],[49,21],[69,28],[70,3],[12,57],[10,82],[36,29],[81,40],[12,10],[38,37],[4,42],[80,41],[24,1],[94,60],[95,30],[8,56],[70,58],[73,74],[75,58],[15,5],[7,62],[23,88],[27,40],[74,26],[77,99],[58,46],[67,57],[54,34],[23,86],[69,35],[49,47],[75,81],[35,87],[31,25],[11,88],[19,18],[46,75],[22,12],[66,42],[42,95],[38,15],[30,77],[14,97],[63,37],[51,4],[23,44],[50,37],[5,79],[18,22],[58,28],[41,85],[68,11],[34,16],[94,0],[16,99],[74,50],[56,64],[2,74],[12,52],[10,45],[96,55],[69,2],[64,72],[34,62],[76,84],[82,96],[35,44],[28,24],[90,51],[19,33],[75,81],[8,70],[20,49],[55,39],[20,56],[8,68],[9,53],[53,15],[93,23],[93,82],[64,88],[6,41],[79,99],[0,91],[4,73],[24,50],[60,95],[83,64],[40,16],[8,89],[52,18],[89,7],[60,70],[79,17],[46,24],[43,88],[90,64],[54,97],[56,56],[67,49],[11,49],[56,19],[6,88],[36,97],[18,33],[24,85],[64,62],[36,3],[47,21],[62,91],[21,29],[26,28],[27,95],[82,11],[47,96],[95,2],[28,31],[1,33],[36,79],[31,76],[93,84],[17,89],[56,79],[47,18],[14,67],[10,42],[13,43],[69,35],[3,35],[76,42],[60,29],[20,53],[44,35],[49,62],[74,34],[84,97],[88,60],[2,4],[76,92],[51,53],[46,69],[80,16],[74,68],[70,39],[0,13],[98,34],[65,12],[82,86],[84,63],[3,33],[36,69],[87,70],[29,81],[25,19],[47,27],[12,95],[30,92],[68,42],[71,69],[37,70],[73,5],[23,77],[63,19],[43,68],[57,70],[66,60],[70,80],[35,30],[49,23],[60,90],[6,3],[7,35],[71,11],[23,93],[14,76],[82,80],[1,8],[6,9],[1,32],[12,36],[8,36],[87,90],[45,38],[27,86],[22,22],[37,33],[14,91],[98,6],[24,5],[1,22],[83,7],[47,76],[66,78],[48,58],[90,21],[73,84],[73,86],[8,89],[82,98],[84,2],[46,58],[63,52],[3,76],[49,84],[61,61],[88,59],[2,24],[55,82],[50,41],[61,31],[87,6],[7,94],[10,84],[80,3],[40,43],[89,65],[70,35],[92,4],[36,83],[1,51],[42,36],[66,26],[16,41],[80,43],[13,54],[23,5],[42,65],[82,34],[49,87],[31,91],[78,93],[75,95],[5,89],[46,60],[24,6],[95,81],[17,54],[28,12],[83,94],[48,38],[36,82],[62,58],[85,20],[62,5],[77,4],[86,7],[49,32],[11,86],[54,20],[1,77],[75,67],[64,82],[83,17],[21,86],[52,70],[29,12],[59,23],[41,98],[23,27],[69,42],[25,18],[57,0],[0,57],[12,75],[43,77],[81,29],[82,14],[22,92],[73,68],[6,88],[71,50],[80,89],[85,52],[6,78],[59,56],[76,50],[74,79],[25,85],[41,67],[51,86],[69,24],[89,78],[52,17],[88,66],[20,37],[29,32],[95,47],[39,51],[36,72],[27,71],[57,2],[61,64],[41,72],[3,65],[51,4],[67,11],[49,75],[80,55],[15,48],[96,85],[85,8],[19,79],[1,38],[49,62],[12,8],[30,89],[91,73],[22,17],[38,42],[31,22],[66,52],[66,84],[94,95],[54,78],[31,98],[82,7],[7,96],[0,56],[98,63],[25,66],[20,19],[66,64],[13,53],[73,10],[49,13],[51,72],[18,66],[33,42],[74,45],[7,97],[62,59],[20,1],[82,48],[95,52],[4,66],[39,63],[87,76],[78,4],[16,19],[89,29],[50,71],[44,91],[75,65],[40,92],[29,13],[85,63],[10,89],[92,6],[74,21],[47,86],[24,42],[90,70],[48,18],[73,3],[10,69],[11,6],[75,12],[43,96],[41,84],[63,58],[54,62],[62,17],[42,1],[86,27],[8,83],[92,92],[14,55],[93,12],[31,20],[34,20],[12,2],[82,55],[0,84],[47,57],[42,13],[18,37],[94,38],[6,78],[56,93],[34,27],[16,1],[60,3],[76,76],[50,43],[10,83],[31,10],[40,96],[2,46],[32,96],[71,90],[90,21],[3,5],[4,52],[17,0],[91,4],[88,55],[4,69],[47,43],[95,43],[25,20],[29,4],[21,60],[55,23],[92,64],[44,11],[35,78],[51,87],[39,86],[91,44],[76,83],[80,86],[64,44],[72,66],[68,23],[98,37],[36,1],[93,52],[53,85],[16,56],[89,91],[2,43],[14,13],[10,16],[56,72],[7,56],[87,11],[43,89],[75,28],[24,84],[39,49],[31,59],[78,15],[0,17],[99,34],[42,23],[35,33],[43,75],[39,70],[97,12],[83,90],[68,79],[17,82],[90,65],[14,21],[57,14],[66,99],[27,30],[64,50],[11,52],[62,34],[89,99],[91,21],[58,14],[4,16],[81,32],[4,39],[16,77],[19,66],[20,33],[82,36],[28,6],[95,45],[7,9],[70,51],[91,95],[18,89],[36,62],[70,14],[30,11],[76,91],[51,88],[34,60],[10,59],[48,76],[66,43],[72,91],[52,69],[79,63],[53,75],[21,94],[55,13],[78,45],[72,91],[45,64],[47,67],[74,39],[77,47],[58,72],[29,11],[13,61],[24,45],[58,66],[1,72],[92,55],[12,70],[31,25],[40,7],[14,93],[66,41],[51,2],[78,87],[6,45],[79,35],[83,23],[57,73],[23,40],[38,91],[5,61],[85,90],[83,29],[89,72],[87,53],[46,24],[43,36],[65,63],[51,38],[36,74],[92,95],[34,13],[67,22],[99,91],[8,7],[10,71],[80,91],[88,14],[3,8],[19,15],[69,52],[52,50],[51,14],[39,38],[58,83],[37,57],[40,99],[3,5],[63,34],[30,11],[78,0],[78,4],[42,55],[81,89],[91,46],[72,64],[95,92],[18,10],[40,50],[71,87],[58,49],[4,69],[17,43],[6,34],[78,59],[38,80],[62,39],[14,74],[95,22],[12,50],[91,85],[97,64],[45,89],[65,51],[71,15],[23,89],[9,89],[92,64],[12,10],[95,18],[92,64],[59,3],[3,93],[24,76],[10,57],[1,51],[21,7],[81,60],[2,67],[75,31],[58,38],[68,36],[57,11],[13,24],[68,68],[61,74],[96,13],[51,44],[30,63],[24,52],[59,82],[67,75],[20,45],[57,31],[30,5],[59,47],[88,10],[4,1],[99,75],[26,0],[14,50],[92,81],[5,66],[28,9],[90,28],[88,80],[38,58],[11,49],[31,33],[25,13],[25,81],[87,39],[39,27],[20,62],[76,11],[67,12],[78,59],[98,48],[29,52],[29,76],[51,10],[92,4],[27,57],[28,21],[88,77],[99,41],[33,7],[50,88],[33,85],[55,55],[81,59],[31,36],[56,8],[46,49],[18,21],[64,37],[65,86],[98,2],[92,95],[35,91],[64,2],[80,94],[64,3],[59,3],[55,71],[96,68],[56,16],[31,17],[86,63],[23,63],[73,38],[9,25],[25,54],[37,74],[88,78],[32,51],[70,70],[61,16],[9,26],[84,72],[88,88],[98,68],[21,96],[25,87],[91,26],[86,80],[25,58],[26,7],[12,25],[43,83],[30,98],[32,50],[99,3],[18,37],[40,53],[52,36],[22,24],[87,87],[86,18],[58,16],[86,35],[66,79],[72,27],[8,92],[75,41],[49,82],[51,21],[70,61],[81,72],[82,66],[4,13],[27,25],[64,75],[5,32],[16,72],[96,80],[10,63],[9,3],[88,80],[50,4],[19,87],[4,4],[55,41],[52,85],[62,25],[63,67],[74,8],[15,4],[7,10],[15,30],[20,2],[56,97],[8,26],[14,71],[58,92],[75,98],[24,64],[76,51],[35,52],[87,78],[24,93],[53,0],[33,35],[37,37],[67,12],[17,61],[55,46],[27,9],[87,16],[2,33],[12,50],[11,34],[4,27],[31,66],[37,6],[39,81],[0,54],[92,90],[24,82],[14,74],[60,10],[56,55],[23,16],[94,18],[31,84],[14,24],[0,77],[54,46],[99,42],[47,71],[9,54],[55,81],[47,79],[0,27],[37,74],[51,81],[82,42],[77,4],[72,84],[47,46],[68,61],[64,52],[40,64],[97,67],[7,67],[99,91],[17,93],[48,11],[38,13],[17,13],[96,34],[31,28],[74,10],[8,45],[11,31],[73,38],[94,92],[89,21],[81,94]];

var fliesInfo = [[60,64],[70,23],[29,75],[74,18],[80,84],[9,78],[95,17],[51,42],[1,2],[64,41],[96,64],[65,30],[53,86],[73,43],[25,5],[93,47],[48,7],[76,39],[78,49],[70,15],[17,76],[76,36],[28,55],[96,29],[25,89],[77,41],[40,69],[32,15],[6,29],[11,38],[19,27],[30,59],[4,37],[1,52],[72,19],[79,27],[80,81],[39,17],[84,71],[90,53],[62,9],[96,3],[59,19],[72,93],[9,17],[44,12],[3,21],[43,35],[22,70],[94,29],[9,13],[7,33],[53,81],[40,94],[6,92],[69,97],[67,93],[60,72],[36,56],[36,23],[15,38],[91,74],[80,72],[91,67],[73,34],[63,8],[7,15],[7,20],[98,58],[98,44],[31,38],[85,64],[62,60],[7,39],[33,20],[63,83],[34,89],[84,23],[29,77],[6,82],[95,14],[44,66],[52,65],[45,50],[91,48],[24,19],[94,27],[76,61],[30,90],[60,75],[70,55],[84,85],[56,17],[10,74],[43,21],[68,69],[3,2],[97,57],[27,67],[39,21],[54,0],[10,74],[14,96],[4,5],[62,10],[46,97],[61,67],[75,6],[70,18],[10,19],[1,70],[78,21],[91,54],[44,78],[73,60],[91,59],[45,18],[50,32],[33,73],[6,71],[44,38],[90,94],[18,59],[89,39],[99,52],[10,93],[10,32],[13,35],[78,89],[97,16],[29,6],[18,76],[51,70],[63,31],[23,12],[87,38],[81,7],[57,74],[99,98],[27,35],[1,62],[40,28],[88,0],[13,97],[79,97],[48,56],[68,64],[1,63],[48,19],[37,21],[27,34],[59,39],[81,1],[60,42],[41,97],[78,35],[53,83],[85,9],[47,85],[49,18],[84,90],[76,78],[1,46],[19,64],[8,27],[22,91],[72,17],[30,91],[85,25],[30,47],[3,89],[51,27],[53,41],[17,88],[53,87],[54,77],[96,22],[24,91],[92,24],[50,76],[84,67],[15,51],[86,30],[36,42],[12,4],[71,53],[57,23],[75,83],[11,26],[59,43],[62,21],[46,6],[29,30],[55,97],[32,24],[39,25],[49,71],[12,49],[18,15],[47,70],[27,45],[60,9],[36,8],[4,68],[4,70],[58,29],[27,67],[19,47],[53,1],[68,71],[90,26],[38,49],[53,44],[1,34],[68,32],[84,83],[20,85],[53,68],[25,9],[11,75],[99,74],[13,8],[91,20],[42,2],[72,94],[22,8],[9,47],[13,70],[50,28],[92,80],[9,81],[10,96],[26,93],[94,22],[21,70],[15,67],[74,94],[8,8],[48,75],[42,15],[22,70],[38,56],[50,80],[84,52],[68,9],[98,22],[82,74],[74,35],[36,42],[52,98],[23,0],[0,69],[71,16],[60,20],[84,34],[75,40],[15,45],[51,77],[92,59],[75,60],[42,78],[75,83],[51,41],[7,24],[82,43],[0,87],[34,28],[33,86],[64,20],[54,30],[51,19],[53,86],[86,54],[76,46],[26,41],[72,13],[95,40],[9,63],[59,67],[75,63],[21,18],[56,43],[48,68],[54,69],[62,50],[66,96],[54,68],[59,75],[6,73],[17,71],[66,82],[41,63],[32,10],[75,19],[13,48],[2,52],[53,37],[31,26],[12,27],[85,35],[8,21],[46,18],[56,69],[92,36],[56,14],[15,94],[27,81],[93,56],[85,83],[19,19],[24,38],[22,41],[66,21],[45,12],[43,29],[65,28],[54,76],[11,47],[66,80],[59,16],[97,54],[86,42],[67,10],[97,94],[1,98],[39,61],[29,7],[82,19],[50,35],[37,92],[89,55],[75,9],[23,69],[67,55],[24,20],[14,63],[13,32],[7,49],[56,46],[15,46],[51,39],[47,64],[52,66],[83,95],[92,35],[80,83],[35,41],[48,1],[44,99],[95,85],[64,66],[16,54],[94,75],[96,0],[21,12],[5,39],[57,67],[87,9],[34,6],[67,39],[2,88],[17,92],[21,45],[10,55],[58,29],[39,39],[11,11],[70,5],[93,75],[19,43],[81,55],[23,39],[50,5],[70,94],[27,34],[49,1],[57,35],[55,49],[45,47],[47,24],[59,51],[89,62],[23,92],[59,8],[93,78],[35,21],[17,20],[57,72],[83,50],[53,17],[48,29],[66,40],[96,94],[31,96],[36,46],[91,18],[55,74],[36,81],[51,43],[0,22],[39,15],[23,55],[78,98],[0,45],[72,59],[4,60],[9,94],[47,29],[49,3],[92,43],[58,27],[8,25],[53,16],[71,34],[43,29],[46,53],[86,15],[28,61],[87,33],[50,36],[73,2],[49,56],[35,58],[60,58],[60,37],[30,10],[35,86],[33,51],[87,88],[53,9],[7,17],[1,6],[94,97],[67,2],[28,35],[59,42],[83,74],[27,34],[94,53],[15,50],[98,81],[3,44],[67,32],[28,47],[96,44],[70,88],[63,76],[93,14],[13,11],[75,84],[42,94],[63,49],[50,34],[39,96],[97,33],[46,50],[99,50],[36,85],[56,63],[43,65],[54,91],[57,98],[79,42],[8,69],[96,16],[99,68],[61,33],[2,29],[20,18],[19,2],[21,66],[50,80],[80,8],[50,92],[31,24],[80,38],[58,78],[69,77],[74,98],[13,35],[57,45],[56,81],[53,26],[24,40],[53,70],[65,15],[84,32],[12,46],[23,0],[11,27],[89,38],[12,49],[66,31],[14,77],[41,33],[17,12],[42,7],[89,93],[3,87],[92,94]];

if (wallsInfo.length == 0) {

  for (var i = 0; i < 2000; i++) {
    var wall = genFly();
    while (wall[0] == level.frog.x && wall[1] == level.frog.y) {
      wall = genFly();
    }
    wallsInfo.push(wall);
  }

  for (var i = 0; i < 500; i++) {
    var fly;
    do {
      fly = genFly();
    } while ((function(x, y) {
      for (var k = 0; k < wallsInfo.length; k++)
      if (wallsInfo[k][0] == x && wallsInfo[k][1] == y)
      return true;
    return false;
    })(fly[0], fly[1]));
    fliesInfo.push(fly);
  }

  var blob = new Blob([JSON.stringify(wallsInfo), '\n', JSON.stringify(fliesInfo)]);
  saveAs(blob, "emulation3.json");
  var input = "";
  input = input.concat("{0} {1}\n".format(level.width, level.height));
  input = input.concat("{0} {1}\n".format(level.frog.x, level.frog.y));
  input = input.concat("{0}\n".format(wallsInfo.length));
  for (var i = 0; i < wallsInfo.length; i++)
    input = input.concat("{0} {1}\n".format(wallsInfo[i][0], wallsInfo[i][1]));
  input = input.concat("{0}\n".format(fliesInfo.length));
  for (var i = 0; i < fliesInfo.length; i++)
    input = input.concat("{0} {1}\n".format(fliesInfo[i][0], fliesInfo[i][1]));
  saveAs(new Blob([input]), "emulation3.txt");
}

for (var i = 0; i < fliesInfo.length; i++) {
  var cur = fliesInfo[i];
  level.flies.push({
    x: cur[0], 
    y: cur[1], 
    dir: cur[2],
    move : function(level) {
      var nx = this.x;
      var ny = this.y;
      if (level.frog.direction == 'r') nx++;
      if (level.frog.direction == 'l') nx--;
      if (level.frog.direction == 'u') ny--;
      if (level.frog.direction == 'd') ny++;
      if (!level.inMap(nx, ny) || level.hasWall(nx, ny)) {
        return {x : this.x, y : this.y};
      }
      return {x : nx, y : ny};
    },
  });
}

for (var i = 0; i < wallsInfo.length; i++) {
  level.walls.push({x : wallsInfo[i][0], y : wallsInfo[i][1]});
}


game.levels.push(level);
})();
