game.levels = [
  {
    name   : 'Level 1',
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
  },
  {
    name   : 'Level 2',
    width  : 5,
    height : 5,
    frog : {
      x : 2,
      y : 2,
      range : 1,
    },
    flies : [],
    walls: [],
    scoreFunction : function (flies, moves) {
      return flies/(moves+1);
    }
  },
  {
    name   : 'Level 3',
    width  : 5,
    height : 5,
    frog : {
      x : 2,
      y : 2,
      range : 1,
    },
    flies : [],
    walls: [],
    scoreFunction : function (flies, moves) {
      return flies/(moves+1);
    }
  }
];
