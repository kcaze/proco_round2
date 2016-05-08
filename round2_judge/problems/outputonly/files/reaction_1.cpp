#include <iostream>
#include <cmath>
#include <set>
#include <vector>
#include <string>
#include "utils.h"
using namespace std;

struct Coordinate {
  int x, y;
};

vector <Coordinate> spiders;
Coordinate ship;

int fliesCaught = 0;
int moves = 0;
int waits = 0;
int W, H, nSpiders;

int main(int argc, char *argv[]) {
  init(argc, argv);
  fscanf(inf, "%d%d", &W, &H);
  fscanf(inf, "%d%d", &ship.x, &ship.y);
  fscanf(inf, "%d", &nSpiders);
  spiders = vector<Coordinate>(nSpiders);
  for (int i = 0; i < nSpiders; i++) {
    int x, y;
    char d[3];
    fscanf(inf, "%d%d%s", &x, &y, d);
    if (i > 0) {
      int dir = directionToIndex(d[0]);
      x += DX[dir];
      y += DY[dir];
    }
    spiders[i].x = x; spiders[i].y = y;
  }

  while (!ans.eof()) {
    char c = ans.readChar();
    if (c == 0) break;

    int index = directionToIndex(c);
    moves++;
    if (index == 4) waits++;
  }
  endProgram(0);
}
