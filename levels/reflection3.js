(function () {
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
  }
  function getRandomDir() {
    var t = getRandomInt(0, 4);
    if (t == 0) return 'U';
    if (t == 1) return 'D';
    if (t == 2) return 'L';
    if (t == 3) return 'R';
  }
var level = 
  {
    // Level name
    name   : 'Reflection 3',
    // Width of level in tiles
    width  : 836,
    // Height of level in tiles
    height : 24,
    // Player properties
    frog : {
      // Player's initial x position
      x : 0,
      // Player's initial y position
      y : 12,
      // Range for player's tongue, computed using Manhattan metric
      range : 0,
    },
    // List of flies, see below for example fly.
    flies : [],
    // List of walls, see below for example wall.
    walls: [],
    // Objective function, takes in number of flies eaten and moves made
    scoreFunction : function (flies, moves, waits) {
      return flies - (moves - waits);
    },

    inMap: function(x, y) {
      return x >= 0 && y >= 0 && x < this.width && y < this.height;
    },

    hasWall: function(x, y) {
      return !this.inMap(x, y) || this.walls[y][x];
    },
    
  };
var genFly = function() {
  while (true) {
    var x = getRandomInt(0, level.width);
    var y = getRandomInt(0, level.height);
    var dir = getRandomInt(0, 4);
    if (dir == 0) {
      return [x, y, 'D'];
    } else if (dir == 1) {
      return [x, y, 'R'];
    } else if (dir == 2) {
      return [x, y, 'U'];
    } else {
      return [x, y, 'L'];
    }
  }
};

var Dx = {
  'U' : 0,
  'D' : 0,
  'L' : -1,
  'R' : 1,
};

var Dy = {
  'U' : 1,
  'D' : -1,
  'L' : 0,
  'R' : 0,
};

var leftdir = {
  'U' : 'L',
  'D' : 'R',
  'L' : 'D',
  'R' : 'U',
};

var rightdir = {
  'U' : 'R',
  'D' : 'L',
  'L' : 'U',
  'R' : 'D',
};

var fliesInfo = [[16,14,"U"],[540,17,"R"],[361,19,"D"],[819,11,"U"],[346,14,"L"],[655,21,"U"],[198,14,"R"],[691,20,"D"],[350,14,"R"],[136,6,"D"],[296,16,"U"],[405,8,"D"],[119,5,"R"],[811,9,"U"],[286,5,"U"],[512,11,"L"],[218,20,"R"],[175,18,"D"],[194,19,"R"],[117,10,"R"],[105,10,"D"],[709,19,"D"],[268,11,"U"],[602,10,"L"],[199,10,"R"],[623,11,"D"],[1,13,"D"],[340,15,"U"],[124,7,"R"],[415,9,"R"],[476,3,"R"],[14,15,"U"],[367,15,"U"],[376,11,"R"],[137,9,"D"],[32,10,"D"],[707,7,"U"],[763,16,"L"],[798,14,"U"],[402,13,"L"],[202,10,"R"],[22,11,"D"],[581,8,"L"],[623,3,"U"],[487,16,"L"],[152,4,"R"],[11,10,"L"],[706,16,"L"],[720,13,"L"],[278,17,"U"],[267,16,"R"],[150,19,"R"],[558,11,"D"],[716,8,"R"],[703,10,"L"],[307,7,"R"],[607,7,"U"],[180,15,"R"],[576,13,"R"],[735,3,"U"],[89,8,"R"],[823,13,"U"],[567,13,"L"],[346,15,"R"],[686,11,"U"],[760,10,"R"],[810,8,"D"],[442,14,"R"],[659,14,"U"],[280,16,"U"],[41,13,"R"],[556,22,"L"],[825,17,"U"],[681,11,"U"],[62,8,"R"],[411,5,"R"],[561,14,"L"],[556,20,"R"],[547,10,"R"],[620,3,"D"],[688,7,"R"],[668,17,"U"],[644,9,"L"],[262,10,"R"],[380,7,"L"],[831,13,"U"],[666,6,"L"],[143,11,"U"],[523,13,"U"],[289,7,"L"],[687,9,"U"],[555,17,"D"],[148,18,"D"],[269,15,"R"],[348,11,"U"],[157,1,"L"],[450,16,"D"],[625,5,"L"],[44,14,"U"],[716,7,"D"],[365,20,"R"],[711,1,"D"],[122,11,"U"],[191,10,"D"],[184,18,"L"],[527,16,"U"],[557,9,"R"],[774,10,"D"],[74,8,"D"],[723,11,"R"],[740,9,"L"],[672,11,"L"],[460,7,"D"],[132,17,"R"],[793,10,"L"],[567,17,"D"],[310,11,"U"],[240,11,"U"],[203,13,"U"],[778,17,"D"],[279,11,"D"],[541,17,"L"],[553,21,"U"],[263,13,"U"],[355,18,"L"],[492,18,"U"],[387,6,"L"],[574,9,"U"],[374,17,"R"],[811,9,"D"],[504,11,"D"],[416,20,"R"],[551,16,"L"],[241,10,"U"],[95,17,"L"],[666,13,"L"],[358,18,"R"],[367,18,"U"],[523,7,"D"],[139,9,"L"],[419,21,"L"],[71,6,"D"],[498,10,"R"],[593,10,"L"],[691,8,"D"],[713,9,"U"],[812,4,"D"],[659,13,"R"],[361,10,"L"],[296,21,"D"],[318,17,"U"],[455,16,"U"],[476,9,"D"],[1,13,"D"],[531,15,"R"],[539,10,"D"],[189,4,"U"],[497,14,"D"],[31,10,"U"],[261,15,"D"],[818,18,"D"],[680,10,"U"],[442,10,"R"],[331,9,"R"],[108,16,"R"],[832,9,"D"],[387,16,"U"],[22,11,"U"],[804,10,"L"],[179,10,"L"],[186,16,"L"],[395,7,"D"],[758,17,"U"],[63,13,"U"],[119,9,"U"],[716,11,"L"],[37,16,"U"],[581,11,"R"],[115,5,"L"],[692,11,"R"],[497,20,"U"],[214,13,"L"],[100,16,"L"],[619,4,"U"],[400,8,"D"],[509,7,"R"],[686,6,"R"],[255,17,"L"],[131,13,"R"],[218,17,"U"],[692,9,"L"],[219,15,"L"],[104,10,"U"],[76,5,"U"],[85,9,"U"],[143,7,"R"],[5,14,"U"],[159,8,"D"],[467,2,"L"],[346,9,"L"],[450,18,"R"],[7,10,"D"],[666,10,"L"],[578,15,"U"],[59,15,"D"],[303,7,"D"],[729,16,"L"],[48,9,"L"],[780,14,"L"],[621,15,"U"],[303,9,"D"],[478,7,"D"],[683,3,"U"],[377,4,"D"],[124,10,"L"],[724,10,"L"],[806,15,"U"],[253,11,"R"],[802,8,"L"],[753,19,"R"],[326,5,"R"],[619,21,"U"],[205,14,"U"],[825,11,"U"],[699,16,"R"],[757,8,"R"],[568,9,"L"],[822,15,"R"],[603,14,"U"],[405,13,"D"],[380,9,"U"],[644,13,"D"],[624,11,"D"],[44,6,"R"],[170,11,"D"],[187,17,"L"],[456,8,"L"],[332,5,"D"],[755,14,"U"],[699,11,"U"],[62,10,"L"],[785,13,"L"],[712,10,"L"],[801,10,"U"],[374,18,"L"],[756,15,"U"],[511,14,"L"],[199,11,"L"],[716,9,"D"],[699,16,"R"],[675,4,"L"],[116,15,"D"],[808,14,"D"],[109,11,"U"],[825,18,"R"],[349,15,"L"],[284,14,"U"],[312,11,"D"],[54,17,"R"],[231,10,"D"],[708,19,"D"],[409,17,"U"],[408,16,"R"],[204,6,"U"],[118,8,"R"],[474,13,"U"],[741,7,"R"],[46,9,"D"],[698,6,"R"],[399,10,"D"],[426,14,"L"],[182,8,"D"],[229,13,"R"],[542,9,"U"],[164,4,"L"],[606,13,"D"],[672,3,"R"],[816,3,"D"],[493,9,"D"],[720,8,"R"],[63,16,"U"],[657,4,"L"],[199,4,"R"],[35,16,"L"],[758,7,"D"],[410,5,"D"],[587,13,"D"],[563,14,"L"],[672,3,"L"],[450,15,"R"],[779,14,"L"],[532,6,"R"],[531,14,"R"],[541,20,"D"],[182,10,"D"],[42,11,"L"],[369,16,"D"],[459,7,"R"],[439,9,"U"],[151,5,"L"],[107,10,"L"],[91,16,"D"],[279,11,"L"],[343,11,"U"],[7,11,"L"],[412,11,"R"],[424,19,"D"],[550,9,"U"],[271,7,"R"],[339,8,"L"],[533,11,"R"],[5,13,"R"],[393,9,"D"],[397,6,"R"],[94,15,"D"],[665,15,"D"],[613,17,"U"],[104,7,"U"],[803,10,"L"],[315,15,"L"],[704,13,"R"],[468,8,"D"],[686,9,"R"],[798,7,"D"],[501,17,"L"],[452,17,"L"],[672,14,"U"],[1,11,"U"],[805,14,"D"],[150,16,"R"],[635,16,"U"],[715,9,"L"],[82,9,"U"],[524,5,"R"],[111,8,"R"],[582,10,"L"],[683,2,"R"],[694,13,"L"],[307,9,"D"],[771,11,"R"],[765,9,"R"],[311,11,"U"],[658,14,"R"],[774,7,"R"],[10,10,"R"],[132,13,"L"],[450,17,"D"],[111,10,"D"],[792,13,"R"],[264,10,"U"],[625,15,"U"],[155,16,"U"],[579,17,"D"],[278,6,"R"],[279,18,"D"],[813,7,"R"],[464,11,"L"],[558,17,"L"],[255,11,"D"],[55,6,"L"],[93,16,"R"],[469,9,"R"],[342,14,"R"],[464,14,"U"],[252,7,"R"],[245,10,"L"],[800,13,"L"],[310,13,"D"],[400,5,"D"],[442,13,"U"],[233,3,"U"],[116,11,"D"],[625,3,"R"],[30,8,"D"],[158,14,"R"],[709,6,"R"],[492,10,"R"],[813,6,"D"],[593,8,"L"],[803,15,"L"],[264,13,"R"],[226,14,"L"],[733,7,"L"],[198,5,"L"],[666,15,"L"],[88,8,"R"],[659,8,"R"],[169,10,"D"],[452,8,"D"],[446,17,"R"],[487,15,"U"],[421,7,"D"],[436,13,"L"],[650,8,"R"],[27,10,"U"],[540,10,"R"],[7,13,"D"],[252,15,"L"],[345,21,"R"],[527,19,"R"],[621,13,"R"],[154,18,"D"],[759,19,"D"],[638,14,"L"],[180,13,"U"],[460,13,"D"],[213,15,"L"],[344,11,"R"],[73,14,"L"],[561,15,"U"],[374,11,"R"],[587,10,"U"],[359,16,"L"],[180,17,"L"],[735,6,"L"],[251,11,"U"],[800,16,"R"],[555,20,"D"],[660,6,"R"],[51,11,"U"],[634,20,"D"],[17,13,"L"],[72,11,"R"],[92,16,"D"],[520,8,"R"],[81,9,"L"],[316,16,"L"],[694,14,"L"],[742,9,"L"],[803,13,"R"],[811,16,"R"],[112,13,"R"],[5,13,"R"],[14,14,"L"],[630,7,"R"],[596,16,"U"],[45,14,"D"],[131,8,"R"],[91,16,"U"],[300,16,"R"],[621,11,"R"],[433,13,"L"],[682,9,"L"],[342,14,"L"],[676,2,"U"],[670,7,"U"],[552,20,"R"],[424,11,"U"],[430,13,"R"],[599,8,"L"],[339,1,"R"],[97,9,"R"],[352,17,"R"],[559,16,"R"],[174,4,"L"],[698,10,"D"],[187,19,"D"],[496,11,"R"],[106,7,"R"],[778,16,"D"],[698,8,"U"],[748,3,"L"],[339,16,"R"],[522,9,"U"],[311,10,"L"],[515,7,"R"],[739,7,"L"],[775,8,"R"],[780,15,"D"],[299,18,"L"],[699,4,"D"],[785,15,"D"],[608,15,"U"],[199,5,"U"],[628,16,"U"],[407,15,"U"],[643,7,"R"],[373,16,"R"],[183,4,"U"],[811,7,"L"],[721,13,"L"],[16,11,"D"],[571,18,"D"],[209,15,"R"],[98,13,"D"],[629,9,"R"],[248,15,"L"],[639,18,"D"],[535,18,"D"],[218,8,"U"],[25,14,"D"],[122,14,"D"],[351,14,"R"],[192,19,"L"],[322,9,"U"],[785,10,"D"],[463,6,"R"],[458,11,"R"],[302,8,"U"],[358,17,"D"],[16,14,"R"],[825,6,"U"],[480,10,"L"],[228,11,"R"],[580,7,"U"],[407,6,"L"],[626,9,"D"],[618,19,"R"],[120,8,"D"],[626,15,"D"],[314,16,"R"],[183,15,"L"],[525,13,"D"],[693,16,"L"],[143,18,"R"],[812,8,"R"],[109,13,"D"],[644,11,"L"],[581,11,"L"],[301,9,"D"],[752,9,"L"],[570,7,"U"],[40,14,"L"],[712,11,"U"],[297,10,"D"],[531,13,"D"],[638,17,"L"],[11,8,"U"],[352,11,"R"],[150,18,"R"],[16,14,"R"],[133,6,"L"],[193,10,"R"],[802,10,"R"],[646,16,"L"],[396,9,"D"],[116,9,"D"],[423,13,"R"],[523,10,"U"],[267,15,"D"],[424,7,"U"],[620,16,"D"],[737,7,"U"],[806,7,"D"],[60,14,"U"],[592,13,"L"],[344,17,"L"],[575,9,"L"],[253,18,"L"],[429,14,"U"],[42,8,"U"],[742,11,"D"],[582,14,"L"],[562,17,"D"],[734,8,"D"],[820,10,"R"],[622,10,"L"],[619,18,"U"],[697,14,"R"],[792,14,"D"],[270,15,"L"],[396,9,"U"],[636,15,"R"],[7,13,"L"],[80,13,"D"],[258,7,"D"],[50,16,"L"],[587,8,"D"],[411,17,"U"],[548,16,"R"],[386,16,"D"],[766,9,"L"],[427,11,"U"],[161,9,"D"],[616,9,"R"],[79,14,"L"],[209,19,"D"],[684,8,"L"],[539,10,"D"],[664,14,"R"],[303,13,"R"],[269,19,"U"],[356,18,"L"],[96,9,"U"],[71,11,"U"],[768,10,"U"],[484,18,"U"],[356,16,"D"],[506,9,"L"],[361,18,"U"],[108,6,"R"],[831,13,"L"],[130,2,"R"],[355,9,"L"],[716,13,"U"],[6,15,"R"],[296,17,"U"],[255,19,"R"],[711,6,"L"],[412,15,"U"],[206,6,"L"],[51,18,"L"],[398,14,"R"],[61,8,"L"],[220,5,"D"],[455,8,"D"],[130,13,"U"],[463,15,"R"],[353,11,"R"],[59,18,"L"],[414,9,"L"],[146,10,"R"],[729,15,"D"],[333,4,"U"],[237,14,"U"],[226,6,"R"],[677,13,"D"],[52,15,"L"],[686,15,"U"],[348,11,"D"],[345,20,"D"],[565,19,"R"],[85,8,"D"],[536,8,"D"],[68,6,"D"],[604,15,"R"],[152,9,"L"],[746,16,"L"],[802,15,"L"],[777,4,"L"],[768,14,"L"],[630,13,"U"],[368,13,"R"],[808,10,"L"],[119,9,"R"],[715,3,"L"],[452,16,"D"],[116,16,"D"],[507,19,"L"],[365,14,"L"],[819,6,"D"],[275,18,"L"],[133,4,"D"],[644,10,"L"],[128,8,"U"],[437,16,"U"],[732,14,"D"],[810,15,"U"],[731,10,"U"],[336,5,"U"],[629,16,"R"],[644,9,"D"],[820,14,"D"],[677,5,"L"],[688,13,"U"],[777,13,"D"],[32,13,"L"],[151,15,"R"],[695,15,"D"],[582,8,"R"],[483,9,"R"],[467,9,"U"],[123,9,"L"],[4,13,"L"],[566,11,"R"],[832,13,"D"],[832,11,"U"],[96,11,"U"],[369,9,"L"],[598,16,"R"],[297,15,"R"],[227,11,"D"],[673,5,"R"],[524,13,"L"],[212,14,"R"],[813,5,"R"],[766,17,"D"],[773,4,"D"],[754,4,"R"],[484,17,"R"],[95,11,"U"],[302,6,"D"],[350,10,"R"],[451,15,"U"],[799,9,"D"],[763,17,"D"],[174,8,"R"],[61,9,"R"],[565,18,"U"],[370,21,"D"],[680,9,"D"],[522,11,"U"],[369,21,"L"],[25,10,"U"],[175,7,"R"],[828,15,"R"],[170,19,"L"],[391,7,"D"],[550,10,"U"],[259,18,"U"],[607,8,"D"],[84,13,"R"],[697,8,"D"],[372,9,"L"],[472,9,"D"],[554,13,"L"],[151,5,"U"],[376,20,"U"],[168,18,"D"],[667,14,"L"],[177,10,"D"],[516,5,"D"],[594,10,"R"],[399,2,"D"],[218,10,"D"],[126,6,"L"],[813,6,"L"],[313,13,"L"],[529,13,"R"],[585,8,"D"],[300,18,"R"],[56,7,"U"],[117,4,"R"],[224,16,"L"],[39,9,"D"],[637,14,"D"],[332,10,"U"],[800,8,"D"],[794,10,"U"],[787,10,"U"],[705,8,"L"],[598,16,"U"],[623,2,"D"],[120,4,"R"],[48,9,"U"],[475,10,"D"],[433,15,"R"],[205,5,"L"],[748,3,"R"],[457,16,"L"],[447,14,"L"],[418,14,"L"],[436,14,"R"],[286,7,"U"],[447,3,"U"],[415,18,"L"],[414,13,"D"],[29,10,"U"],[678,5,"L"],[307,7,"U"],[117,5,"L"],[635,11,"R"],[560,9,"L"],[687,3,"R"],[342,8,"R"],[60,6,"R"],[755,9,"L"],[711,16,"D"],[646,14,"R"],[243,15,"U"],[531,7,"R"],[553,18,"R"],[280,18,"L"],[651,13,"D"],[463,16,"L"],[653,7,"R"],[14,10,"U"],[633,8,"U"],[178,16,"R"],[441,17,"R"],[105,14,"U"],[570,17,"D"],[397,6,"L"],[715,13,"R"],[213,13,"L"],[514,13,"U"],[311,10,"D"],[780,11,"D"],[509,7,"D"],[55,19,"D"],[34,15,"L"],[139,17,"R"],[477,8,"D"],[665,16,"D"],[529,20,"R"],[572,9,"R"],[351,16,"L"],[171,14,"D"],[390,3,"L"],[443,16,"L"],[131,19,"L"],[712,11,"R"],[533,22,"R"],[162,7,"D"],[446,16,"L"],[786,16,"U"],[47,17,"D"],[450,10,"D"],[732,13,"D"],[226,14,"D"],[525,5,"L"],[573,15,"L"],[353,11,"D"],[466,5,"L"],[733,9,"U"],[69,17,"L"],[348,7,"L"],[507,19,"U"],[203,17,"D"],[224,10,"L"],[506,10,"D"],[113,9,"U"],[813,19,"L"],[463,16,"L"],[74,14,"R"],[213,15,"D"],[523,16,"L"],[22,11,"L"],[358,15,"D"],[279,10,"R"],[232,10,"R"],[625,19,"L"],[813,11,"U"],[443,10,"L"],[424,11,"D"],[240,15,"L"],[407,13,"U"],[42,15,"U"],[352,6,"R"],[67,20,"R"],[656,17,"U"],[213,18,"L"],[410,11,"R"],[163,7,"D"],[759,19,"R"],[465,8,"U"],[528,20,"D"],[655,9,"L"],[589,9,"R"],[232,15,"U"],[509,17,"U"],[325,8,"R"],[410,10,"D"],[813,10,"U"],[191,20,"D"],[1,11,"L"],[176,15,"D"],[551,16,"L"],[126,14,"L"],[576,11,"R"],[361,10,"R"],[454,6,"D"],[495,17,"D"],[183,3,"U"],[831,14,"U"],[217,13,"U"],[64,15,"D"],[448,10,"U"],[541,8,"R"],[454,10,"D"],[225,16,"D"],[781,13,"R"],[67,5,"L"],[200,4,"U"],[328,6,"L"],[776,10,"R"],[346,20,"R"],[580,10,"R"],[762,13,"L"],[200,4,"D"],[14,8,"R"],[507,10,"U"],[330,7,"D"],[278,19,"D"],[554,19,"R"],[795,9,"R"],[6,10,"U"],[38,16,"L"],[14,10,"L"],[741,10,"R"],[483,16,"L"],[528,15,"L"],[756,15,"L"],[220,8,"D"],[651,20,"R"],[555,14,"R"],[662,10,"D"],[213,17,"D"],[225,7,"U"],[799,13,"U"],[233,3,"D"],[221,6,"R"],[272,18,"R"],[171,8,"L"],[555,15,"D"],[97,10,"R"],[704,5,"R"],[105,6,"D"],[201,17,"U"],[515,3,"U"],[496,15,"R"],[674,6,"D"],[544,11,"D"],[511,7,"U"],[824,15,"U"],[278,11,"R"],[630,13,"U"],[710,7,"L"],[547,17,"R"],[687,15,"D"],[635,11,"R"],[486,10,"R"],[489,7,"D"],[641,16,"L"],[86,9,"D"],[479,9,"D"],[21,11,"R"],[711,4,"R"],[767,6,"D"],[571,6,"U"],[72,8,"D"],[506,9,"L"],[55,10,"R"],[81,10,"R"],[204,13,"U"],[282,16,"U"],[732,13,"L"],[654,15,"D"],[223,7,"L"],[794,11,"D"],[523,6,"D"],[613,15,"L"],[678,3,"L"],[93,15,"R"],[607,13,"U"],[444,18,"U"],[565,7,"D"],[16,11,"U"],[373,10,"D"],[332,16,"R"],[733,17,"L"],[423,20,"D"],[615,16,"R"],[56,22,"U"],[143,14,"L"],[409,17,"L"],[812,16,"L"],[826,17,"R"],[165,5,"R"],[313,10,"U"],[485,18,"L"],[282,18,"D"],[102,9,"D"],[827,11,"D"],[680,16,"R"],[651,11,"R"],[482,17,"L"],[794,13,"D"],[817,8,"R"],[685,14,"R"],[735,9,"D"],[659,11,"R"],[539,14,"R"],[634,18,"R"],[449,15,"L"],[815,9,"U"],[412,8,"L"],[497,15,"U"],[528,20,"U"],[38,13,"R"],[217,8,"U"],[347,10,"U"],[567,8,"D"],[696,16,"R"],[751,11,"R"],[715,10,"D"],[412,8,"L"],[198,5,"U"],[696,10,"L"],[433,17,"L"],[774,5,"D"],[686,3,"D"],[690,7,"R"],[213,17,"D"],[152,18,"L"],[264,11,"R"],[37,16,"D"],[640,17,"U"],[306,8,"D"],[799,13,"R"],[427,16,"U"],[203,6,"D"],[263,16,"R"],[374,11,"L"],[729,14,"D"],[53,9,"R"],[764,9,"L"],[325,9,"U"],[176,3,"R"],[180,4,"L"]];

var wallsInfo = [[0,11],[0,13],[3,11],[3,13],[9,8],[9,14],[12,8],[12,14],[18,11],[18,13],[23,11],[23,13],[28,9],[28,13],[34,10],[34,16],[41,6],[41,16],[50,10],[50,18],[58,5],[58,21],[62,6],[62,20],[65,6],[65,20],[73,7],[73,15],[81,8],[81,14],[84,8],[84,14],[87,8],[87,14],[93,11],[93,17],[100,7],[100,17],[103,7],[103,17],[107,6],[107,16],[110,6],[110,16],[114,5],[114,17],[118,4],[118,18],[121,4],[121,18],[127,1],[127,21],[132,3],[132,19],[135,3],[135,19],[139,2],[139,18],[144,4],[144,20],[147,4],[147,20],[150,4],[150,20],[156,1],[156,17],[160,2],[160,16],[167,6],[167,18],[172,4],[172,18],[178,3],[178,19],[181,3],[181,19],[184,3],[184,19],[192,6],[192,20],[195,6],[195,20],[202,4],[202,18],[206,5],[206,17],[214,10],[214,18],[223,6],[223,16],[228,4],[228,14],[236,5],[236,15],[244,6],[244,20],[248,7],[248,19],[253,7],[253,19],[256,7],[256,19],[260,8],[260,18],[266,11],[266,17],[274,6],[274,20],[277,6],[277,20],[281,5],[281,19],[288,5],[288,17],[294,6],[294,20],[300,5],[300,19],[309,7],[309,13],[316,11],[316,17],[320,10],[320,16],[329,6],[329,14],[337,1],[337,15],[346,7],[346,21],[350,6],[350,20],[357,10],[357,20],[360,10],[360,20],[363,10],[363,20],[366,10],[366,20],[372,7],[372,21],[381,5],[381,17],[385,6],[385,18],[394,2],[394,14],[397,2],[397,14],[401,1],[401,13],[408,5],[408,17],[416,8],[416,22],[419,8],[419,22],[428,10],[428,16],[433,10],[433,18],[436,10],[436,18],[440,9],[440,17],[449,3],[449,19],[457,8],[457,18],[461,7],[461,17],[469,2],[469,14],[473,3],[473,13],[482,7],[482,19],[486,6],[486,20],[491,8],[491,22],[496,10],[496,20],[500,11],[500,21],[503,11],[503,21],[512,5],[512,15],[521,7],[521,17],[526,5],[526,19],[530,6],[530,20],[538,9],[538,19],[546,10],[546,18],[554,7],[554,21],[560,6],[560,20],[564,7],[564,19],[568,8],[568,18],[576,9],[576,15],[584,8],[584,14],[588,7],[588,13],[591,7],[591,13],[597,8],[597,16],[600,8],[600,16],[604,9],[604,17],[612,6],[612,18],[615,6],[615,18],[622,2],[622,22],[629,6],[629,18],[638,10],[638,20],[646,9],[646,17],[652,6],[652,20],[661,6],[661,16],[666,4],[666,16],[673,2],[673,14],[679,3],[679,17],[685,2],[685,20],[690,2],[690,20],[696,3],[696,19],[705,5],[705,19],[714,3],[714,15],[723,9],[723,13],[730,7],[730,17],[738,4],[738,14],[743,6],[743,14],[750,2],[750,18],[754,3],[754,19],[761,7],[761,19],[764,7],[764,19],[769,7],[769,19],[775,4],[775,16],[784,10],[784,16],[793,6],[793,16],[797,5],[797,15],[803,8],[803,16],[807,7],[807,15],[814,3],[814,19],[822,6],[822,16],[829,8],[829,16],[835,11],[835,13],[1,10],[2,10],[4,10],[5,9],[6,8],[7,7],[8,7],[10,7],[11,7],[13,7],[17,10],[16,9],[15,8],[14,7],[19,10],[20,9],[22,10],[21,9],[24,10],[25,9],[26,8],[27,8],[29,8],[30,7],[33,9],[32,8],[31,7],[35,9],[36,8],[37,7],[38,6],[39,5],[40,5],[42,5],[43,4],[49,9],[48,8],[47,7],[46,6],[45,5],[44,4],[51,9],[52,8],[53,7],[54,6],[55,5],[56,4],[57,4],[59,4],[61,5],[60,4],[63,5],[64,5],[66,5],[67,4],[68,3],[72,6],[71,5],[70,4],[69,3],[74,6],[75,5],[76,4],[80,7],[79,6],[78,5],[77,4],[82,7],[83,7],[85,7],[86,7],[88,7],[92,10],[91,9],[90,8],[89,7],[94,10],[95,9],[96,8],[97,7],[98,6],[99,6],[101,6],[102,6],[104,6],[105,5],[106,5],[108,5],[109,5],[111,5],[112,4],[113,4],[115,4],[116,3],[117,3],[119,3],[120,3],[122,3],[123,2],[124,1],[125,0],[126,0],[128,0],[131,2],[130,1],[129,0],[133,2],[134,2],[136,2],[137,1],[138,1],[140,1],[143,3],[142,2],[141,1],[145,3],[146,3],[148,3],[149,3],[151,3],[152,2],[153,1],[154,0],[155,0],[157,0],[159,1],[158,0],[161,1],[166,5],[165,4],[164,3],[163,2],[162,1],[168,5],[169,4],[170,3],[171,3],[173,3],[174,2],[175,1],[177,2],[176,1],[179,2],[180,2],[182,2],[183,2],[185,2],[186,1],[191,5],[190,4],[189,3],[188,2],[187,1],[193,5],[194,5],[196,5],[197,4],[198,3],[199,2],[201,3],[200,2],[203,3],[205,4],[204,3],[207,4],[213,9],[212,8],[211,7],[210,6],[209,5],[208,4],[215,9],[216,8],[217,7],[218,6],[219,5],[220,4],[222,5],[221,4],[224,5],[225,4],[226,3],[227,3],[229,3],[230,2],[231,1],[235,4],[234,3],[233,2],[232,1],[237,4],[238,3],[239,2],[243,5],[242,4],[241,3],[240,2],[245,5],[247,6],[246,5],[249,6],[250,5],[252,6],[251,5],[254,6],[255,6],[257,6],[259,7],[258,6],[261,7],[265,10],[264,9],[263,8],[262,7],[267,10],[268,9],[269,8],[270,7],[271,6],[272,5],[273,5],[275,5],[276,5],[278,5],[279,4],[280,4],[282,4],[283,3],[284,2],[287,4],[286,3],[285,2],[289,4],[290,3],[293,5],[292,4],[291,3],[295,5],[296,4],[297,3],[299,4],[298,3],[301,4],[302,3],[303,2],[308,6],[307,5],[306,4],[305,3],[304,2],[310,6],[315,10],[314,9],[313,8],[312,7],[311,6],[317,10],[318,9],[319,9],[321,9],[322,8],[323,7],[324,6],[325,5],[326,4],[328,5],[327,4],[330,5],[331,4],[332,3],[333,2],[334,1],[335,0],[336,0],[338,0],[345,6],[344,5],[343,4],[342,3],[341,2],[340,1],[339,0],[347,6],[348,5],[349,5],[351,5],[356,9],[355,8],[354,7],[353,6],[352,5],[358,9],[359,9],[361,9],[362,9],[364,9],[365,9],[367,9],[368,8],[369,7],[370,6],[371,6],[373,6],[374,5],[375,4],[376,3],[377,2],[380,4],[379,3],[378,2],[382,4],[384,5],[383,4],[386,5],[387,4],[388,3],[389,2],[390,1],[391,0],[393,1],[392,0],[395,1],[396,1],[398,1],[399,0],[400,0],[402,0],[407,4],[406,3],[405,2],[404,1],[403,0],[409,4],[410,3],[415,7],[414,6],[413,5],[412,4],[411,3],[417,7],[418,7],[420,7],[421,6],[422,5],[427,9],[426,8],[425,7],[424,6],[423,5],[429,9],[430,8],[432,9],[431,8],[434,9],[435,9],[437,9],[438,8],[439,8],[441,8],[442,7],[443,6],[444,5],[445,4],[446,3],[447,2],[448,2],[450,2],[456,7],[455,6],[454,5],[453,4],[452,3],[451,2],[458,7],[459,6],[460,6],[462,6],[463,5],[464,4],[465,3],[466,2],[467,1],[468,1],[470,1],[472,2],[471,1],[474,2],[475,1],[481,6],[480,5],[479,4],[478,3],[477,2],[476,1],[483,6],[484,5],[485,5],[487,5],[490,7],[489,6],[488,5],[492,7],[495,9],[494,8],[493,7],[497,9],[499,10],[498,9],[501,10],[502,10],[504,10],[505,9],[506,8],[507,7],[508,6],[509,5],[510,4],[511,4],[513,4],[514,3],[515,2],[520,6],[519,5],[518,4],[517,3],[516,2],[522,6],[523,5],[524,4],[525,4],[527,4],[529,5],[528,4],[531,5],[532,4],[537,8],[536,7],[535,6],[534,5],[533,4],[539,8],[540,7],[541,6],[545,9],[544,8],[543,7],[542,6],[547,9],[548,8],[549,7],[550,6],[551,5],[553,6],[552,5],[555,6],[556,5],[557,4],[559,5],[558,4],[561,5],[563,6],[562,5],[565,6],[567,7],[566,6],[569,7],[570,6],[571,5],[575,8],[574,7],[573,6],[572,5],[577,8],[578,7],[579,6],[580,5],[583,7],[582,6],[581,5],[585,7],[586,6],[587,6],[589,6],[590,6],[592,6],[593,5],[596,7],[595,6],[594,5],[598,7],[599,7],[601,7],[603,8],[602,7],[605,8],[606,7],[607,6],[608,5],[609,4],[611,5],[610,4],[613,5],[614,5],[616,5],[617,4],[618,3],[619,2],[620,1],[621,1],[623,1],[628,5],[627,4],[626,3],[625,2],[624,1],[630,5],[631,4],[637,9],[636,8],[635,7],[634,6],[633,5],[632,4],[639,9],[640,8],[641,7],[642,6],[645,8],[644,7],[643,6],[647,8],[648,7],[649,6],[650,5],[651,5],[653,5],[654,4],[655,3],[656,2],[660,5],[659,4],[658,3],[657,2],[662,5],[663,4],[664,3],[665,3],[667,3],[668,2],[669,1],[670,0],[672,1],[671,0],[674,1],[675,0],[678,2],[677,1],[676,0],[680,2],[681,1],[682,0],[684,1],[683,0],[686,1],[687,0],[689,1],[688,0],[691,1],[692,0],[695,2],[694,1],[693,0],[697,2],[698,1],[699,0],[704,4],[703,3],[702,2],[701,1],[700,0],[706,4],[707,3],[708,2],[709,1],[710,0],[713,2],[712,1],[711,0],[715,2],[722,8],[721,7],[720,6],[719,5],[718,4],[717,3],[716,2],[724,8],[725,7],[726,6],[727,5],[729,6],[728,5],[731,6],[732,5],[733,4],[734,3],[735,2],[737,3],[736,2],[739,3],[742,5],[741,4],[740,3],[744,5],[745,4],[746,3],[747,2],[748,1],[749,1],[751,1],[753,2],[752,1],[755,2],[760,6],[759,5],[758,4],[757,3],[756,2],[762,6],[763,6],[765,6],[766,5],[768,6],[767,5],[770,6],[771,5],[772,4],[773,3],[774,3],[776,3],[783,9],[782,8],[781,7],[780,6],[779,5],[778,4],[777,3],[785,9],[786,8],[787,7],[788,6],[789,5],[790,4],[792,5],[791,4],[794,5],[795,4],[796,4],[798,4],[802,7],[801,6],[800,5],[799,4],[804,7],[805,6],[806,6],[808,6],[809,5],[810,4],[811,3],[812,2],[813,2],[815,2],[816,1],[821,5],[820,4],[819,3],[818,2],[817,1],[823,5],[824,4],[828,7],[827,6],[826,5],[825,4],[830,7],[834,10],[833,9],[832,8],[831,7],[1,14],[2,14],[4,14],[5,15],[6,16],[8,15],[7,16],[10,15],[11,15],[13,15],[14,16],[17,14],[16,15],[15,16],[19,14],[20,15],[22,14],[21,15],[24,14],[25,15],[27,14],[26,15],[29,14],[30,15],[31,16],[32,17],[33,17],[35,17],[36,18],[37,19],[40,17],[39,18],[38,19],[42,17],[43,18],[44,19],[45,20],[46,21],[49,19],[48,20],[47,21],[51,19],[52,20],[53,21],[54,22],[55,23],[57,22],[56,23],[59,22],[61,21],[60,22],[63,21],[64,21],[66,21],[72,16],[71,17],[70,18],[69,19],[68,20],[67,21],[74,16],[75,17],[76,18],[80,15],[79,16],[78,17],[77,18],[82,15],[83,15],[85,15],[86,15],[88,15],[89,16],[90,17],[91,18],[92,18],[94,18],[95,19],[96,20],[99,18],[98,19],[97,20],[101,18],[102,18],[104,18],[106,17],[105,18],[108,17],[109,17],[111,17],[112,18],[113,18],[115,18],[116,19],[117,19],[119,19],[120,19],[122,19],[123,20],[124,21],[125,22],[126,22],[128,22],[131,20],[130,21],[129,22],[133,20],[134,20],[136,20],[138,19],[137,20],[140,19],[141,20],[142,21],[143,21],[145,21],[146,21],[148,21],[149,21],[151,21],[155,18],[154,19],[153,20],[152,21],[157,18],[159,17],[158,18],[161,17],[162,18],[163,19],[164,20],[166,19],[165,20],[168,19],[169,20],[171,19],[170,20],[173,19],[174,20],[175,21],[177,20],[176,21],[179,20],[180,20],[182,20],[183,20],[185,20],[186,21],[187,22],[188,23],[191,21],[190,22],[189,23],[193,21],[194,21],[196,21],[197,22],[201,19],[200,20],[199,21],[198,22],[203,19],[205,18],[204,19],[207,18],[208,19],[209,20],[210,21],[213,19],[212,20],[211,21],[215,19],[216,20],[217,21],[222,17],[221,18],[220,19],[219,20],[218,21],[224,17],[227,15],[226,16],[225,17],[229,15],[230,16],[231,17],[232,18],[235,16],[234,17],[233,18],[237,16],[238,17],[239,18],[240,19],[241,20],[242,21],[243,21],[245,21],[247,20],[246,21],[249,20],[250,21],[252,20],[251,21],[254,20],[255,20],[257,20],[259,19],[258,20],[261,19],[262,20],[265,18],[264,19],[263,20],[267,18],[268,19],[269,20],[270,21],[271,22],[273,21],[272,22],[275,21],[276,21],[278,21],[280,20],[279,21],[282,20],[283,21],[287,18],[286,19],[285,20],[284,21],[289,18],[290,19],[291,20],[292,21],[293,21],[295,21],[296,22],[299,20],[298,21],[297,22],[301,20],[308,14],[307,15],[306,16],[305,17],[304,18],[303,19],[302,20],[310,14],[311,15],[312,16],[313,17],[314,18],[315,18],[317,18],[319,17],[318,18],[321,17],[322,18],[323,19],[328,15],[327,16],[326,17],[325,18],[324,19],[330,15],[331,16],[332,17],[333,18],[336,16],[335,17],[334,18],[338,16],[339,17],[340,18],[341,19],[342,20],[343,21],[344,22],[345,22],[347,22],[349,21],[348,22],[351,21],[352,22],[353,23],[356,21],[355,22],[354,23],[358,21],[359,21],[361,21],[362,21],[364,21],[365,21],[367,21],[368,22],[369,23],[371,22],[370,23],[373,22],[374,23],[380,18],[379,19],[378,20],[377,21],[376,22],[375,23],[382,18],[383,19],[384,19],[386,19],[387,20],[393,15],[392,16],[391,17],[390,18],[389,19],[388,20],[395,15],[396,15],[398,15],[400,14],[399,15],[402,14],[403,15],[404,16],[405,17],[406,18],[407,18],[409,18],[410,19],[411,20],[412,21],[413,22],[414,23],[415,23],[417,23],[418,23],[420,23],[427,17],[426,18],[425,19],[424,20],[423,21],[422,22],[421,23],[429,17],[430,18],[431,19],[432,19],[434,19],[435,19],[437,19],[439,18],[438,19],[441,18],[442,19],[443,20],[444,21],[445,22],[448,20],[447,21],[446,22],[450,20],[451,21],[452,22],[456,19],[455,20],[454,21],[453,22],[458,19],[460,18],[459,19],[462,18],[463,19],[468,15],[467,16],[466,17],[465,18],[464,19],[470,15],[472,14],[471,15],[474,14],[475,15],[476,16],[477,17],[478,18],[479,19],[480,20],[481,20],[483,20],[484,21],[485,21],[487,21],[488,22],[489,23],[490,23],[492,23],[495,21],[494,22],[493,23],[497,21],[498,22],[499,22],[501,22],[502,22],[504,22],[511,16],[510,17],[509,18],[508,19],[507,20],[506,21],[505,22],[513,16],[514,17],[515,18],[516,19],[517,20],[520,18],[519,19],[518,20],[522,18],[523,19],[524,20],[525,20],[527,20],[528,21],[529,21],[531,21],[532,22],[533,23],[537,20],[536,21],[535,22],[534,23],[539,20],[540,21],[541,22],[545,19],[544,20],[543,21],[542,22],[547,19],[548,20],[549,21],[550,22],[551,23],[553,22],[552,23],[555,22],[556,23],[559,21],[558,22],[557,23],[561,21],[563,20],[562,21],[565,20],[567,19],[566,20],[569,19],[570,20],[575,16],[574,17],[573,18],[572,19],[571,20],[577,16],[578,17],[579,18],[583,15],[582,16],[581,17],[580,18],[585,15],[587,14],[586,15],[589,14],[590,14],[592,14],[593,15],[594,16],[595,17],[596,17],[598,17],[599,17],[601,17],[602,18],[603,18],[605,18],[606,19],[607,20],[608,21],[611,19],[610,20],[609,21],[613,19],[614,19],[616,19],[617,20],[618,21],[619,22],[620,23],[621,23],[623,23],[628,19],[627,20],[626,21],[625,22],[624,23],[630,19],[631,20],[632,21],[633,22],[634,23],[637,21],[636,22],[635,23],[639,21],[640,22],[645,18],[644,19],[643,20],[642,21],[641,22],[647,18],[648,19],[649,20],[650,21],[651,21],[653,21],[654,22],[660,17],[659,18],[658,19],[657,20],[656,21],[655,22],[662,17],[663,18],[665,17],[664,18],[667,17],[668,18],[672,15],[671,16],[670,17],[669,18],[674,15],[675,16],[676,17],[677,18],[678,18],[680,18],[681,19],[682,20],[683,21],[684,21],[686,21],[687,22],[689,21],[688,22],[691,21],[692,22],[695,20],[694,21],[693,22],[697,20],[698,21],[699,22],[700,23],[704,20],[703,21],[702,22],[701,23],[706,20],[707,21],[713,16],[712,17],[711,18],[710,19],[709,20],[708,21],[715,16],[716,17],[717,18],[722,14],[721,15],[720,16],[719,17],[718,18],[724,14],[725,15],[726,16],[727,17],[728,18],[729,18],[731,18],[732,19],[737,15],[736,16],[735,17],[734,18],[733,19],[739,15],[740,16],[742,15],[741,16],[744,15],[745,16],[746,17],[747,18],[748,19],[749,19],[751,19],[752,20],[753,20],[755,20],[756,21],[757,22],[760,20],[759,21],[758,22],[762,20],[763,20],[765,20],[766,21],[768,20],[767,21],[770,20],[774,17],[773,18],[772,19],[771,20],[776,17],[777,18],[778,19],[779,20],[783,17],[782,18],[781,19],[780,20],[785,17],[786,18],[787,19],[788,20],[792,17],[791,18],[790,19],[789,20],[794,17],[796,16],[795,17],[798,16],[799,17],[800,18],[802,17],[801,18],[804,17],[806,16],[805,17],[808,16],[809,17],[810,18],[811,19],[812,20],[813,20],[815,20],[816,21],[821,17],[820,18],[819,19],[818,20],[817,21],[823,17],[824,18],[825,19],[828,17],[827,18],[826,19],[830,17],[834,14],[833,15],[832,16],[831,17]];

if (wallsInfo.length == 0) {

(function(){
  level.frog.y = Math.floor(level.height / 2);
  var min_seg = 20;
  var xs = [0];
  var ys1 = [level.frog.y - 1];
  var ys2 = [level.frog.y + 1];
  for (var t = 0; t < min_seg || ys1[0] != ys1[ys1.length - 1] || ys2[0] != ys2[ys2.length - 1]; t++) {
    xs.push(xs[xs.length - 1] + getRandomInt(3, 10));
    var x_cur = xs[xs.length - 1];
    var x_pre = xs[xs.length - 2];
    var succeed = false;
    //for (var rep = 0; rep < 100; rep ++) {
    while (true) {
      var y1 = getRandomInt(1, level.frog.y);
      if (Math.abs(y1 - ys1[ys1.length - 1]) > x_cur - x_pre - 3) continue;
      if ((y1 + ys1[ys1.length - 1] + x_cur + x_pre) % 2 == 0) continue;
      if (Math.min(y1,ys1[ys1.length-1]) - (x_cur - x_pre - 1 - Math.abs(y1 - ys1[ys1.length - 1])) / 2 < 0) continue;
      ys1.push(y1);
      break;
    }
    while (true) {
      var y2 = getRandomInt(level.frog.y + 1, level.height - 1);
      if (Math.abs(y2 - ys2[ys2.length - 1]) > x_cur - x_pre - 3) continue;
      if ((y2 + ys2[ys2.length - 1] + x_cur + x_pre) % 2 == 0) continue;
      if (Math.max(y2,ys2[ys2.length-1]) + (x_cur - x_pre - 1 - Math.abs(y2 - ys2[ys2.length - 1])) / 2 >= level.height) continue;
      ys2.push(y2);
      break;
    }
  }
  level.width = xs[xs.length-1] + 1;
  console.log('width', level.width);
  for (var i = 0; i < xs.length; i++) {
    wallsInfo.push([xs[i],ys1[i]]);
    wallsInfo.push([xs[i],ys2[i]]);
  }
  // Upper mountain
  for (var i = 0; i < xs.length - 1; i++) {
    var x1 = xs[i]; var x2 = xs[i+1];
    var y1 = ys1[i]; var y2 = ys1[i + 1];
    var a, b;
    if (y1 > y2) {
      a = (x2 - x1 - 1 + y1 - y2) / 2;
      b = x2 - x1 - 1 - a;
    } else {
      b = (x2 - x1 - 1 + y2 - y1) / 2;
      a = x2 - x1 - 1 - b;
    }
    for (var k = 1; k <= a; k++)
      wallsInfo.push([x1 + k, y1 - k]);
    for (var k = 1; k <= b; k++)
      wallsInfo.push([x2 - k, y2 - k]);
  }
  // Lower mountain
  for (var i = 0; i < xs.length - 1; i++) {
    var x1 = xs[i]; var x2 = xs[i+1];
    var y1 = ys2[i]; var y2 = ys2[i + 1];
    var a, b;
    if (y1 > y2) {
      a = (x2 - x1 - 1 + y1 - y2) / 2;
      b = x2 - x1 - 1 - a;
    } else {
      b = (x2 - x1 - 1 + y2 - y1) / 2;
      a = x2 - x1 - 1 - b;
    }
    for (var k = 1; k <= b; k++)
      wallsInfo.push([x1 + k, y1 + k]);
    for (var k = 1; k <= a; k++)
      wallsInfo.push([x2 - k, y2 + k]);
  }
  
for (var i = 0; i < 1000; i++) {
  var fly = [-1,-1];
  do {
    fly[0] = getRandomInt(0, level.width);
    var low = level.height, high = 0;
    for (var k = 0; k < wallsInfo.length; k++)
      if (wallsInfo[k][0] == fly[0]) {
        low = Math.min(low, wallsInfo[k][1]);
        high = Math.max(high, wallsInfo[k][1]);
      }
    fly[1] = getRandomInt(low + 1, high);
    fly[2] = getRandomDir();
  } while ((function(x, y, dir) {
    if (y == level.frog.y) return true;
    for (var k = 0; k < xs.length; k++) {
      if (xs[k] == x && (dir == 'U' || dir == 'D')) return true;
    }

    return false;
  })(fly[0], fly[1], fly[2]));
  fliesInfo.push(fly);
}

})();



  var blob = new Blob([JSON.stringify(wallsInfo), '\n', JSON.stringify(fliesInfo)]);
  saveAs(blob, "reflection3.json");
  var input = "";
  input = input.concat("{0} {1}\n".format(level.width, level.height));
  input = input.concat("{0} {1}\n".format(level.frog.x, level.frog.y));
  input = input.concat("{0}\n".format(wallsInfo.length));
  for (var i = 0; i < wallsInfo.length; i++)
    input = input.concat("{0} {1}\n".format(wallsInfo[i][0], wallsInfo[i][1]));
  input = input.concat("{0}\n".format(fliesInfo.length));
  for (var i = 0; i < fliesInfo.length; i++)
    input = input.concat("{0} {1} {2}\n".format(fliesInfo[i][0], fliesInfo[i][1], fliesInfo[i][2]));
  saveAs(new Blob([input]), "reflection3.txt");
}

for (var i = 0; i < fliesInfo.length; i++) {
  var cur = fliesInfo[i];
  level.flies.push({
    x: cur[0], 
    y: cur[1], 
    dir: cur[2],
    move : (function(dx, dy, leftdir, rightdir) {
      return function(level) {
        var nx = this.x + dx[this.dir];
        var ny = this.y + dy[this.dir];
        if (!level.inMap(nx, ny)) {
          return {x : this.x, y : this.y};
        }
        if (!level.hasWall(nx, ny)) {
          return {x : nx, y : ny};
        }

        var rx = this.x + dx[rightdir[this.dir]];
        var ry = this.y + dy[rightdir[this.dir]];
        var rw = level.hasWall(rx, ry);
        var lx = this.x + dx[leftdir[this.dir]];
        var ly = this.y + dy[leftdir[this.dir]];
        var lw = level.hasWall(lx, ly);

        if ((lw && rw) || (!lw && !rw)) {
          return {x : this.x, y : this.y};
        }
        if (lw) {
          this.dir = rightdir[this.dir];
          return {x : rx, y : ry};
        } else {
          this.dir = leftdir[this.dir];
          return {x : lx, y : ly};
        }
      };
    })(Dx, Dy, leftdir, rightdir),
  });
}

for (var i = 0; i < wallsInfo.length; i++) {
  level.walls.push({x : wallsInfo[i][0], y : wallsInfo[i][1]});
}


game.levels.push(level);
})();
