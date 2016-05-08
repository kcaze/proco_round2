#include <iostream>
#include <cmath>
#include <set>
#include <vector>
#include <string>
#include "utils.h"
using namespace std;

int height = 6;
int width = 6;

const int nWalls = 20;
int walls[nWalls][2] = {{0,0}, {1,0}, {2,0}, {3,0}, {4,0}, {5,0},
                              {0,1}, {5,1},
                              {0,2}, {5,2},
                              {0,3}, {5,3},
                              {0,4}, {5,4},
                              {0,5}, {1,5}, {2,5}, {3,5}, {4,5}, {5,5}};

const int nFlies = 15;
static int fly_coords[nFlies][2] = {{2,1}, {3,1}, {4,1},
                              {1,2}, {2,2}, {3,2}, {4,2},
                              {1,3}, {2,3}, {3,3}, {4,3},
                              {1,4}, {2,4}, {3,4}, {4,4}};
set <pii> flies;

int shipx = 1;
int shipy = 1;
int fliesCaught = 0;
int moves = 0;
int waits = 0;

bool validPosition(int x, int y) {
  for (int ii = 0; ii < nWalls; ii++) {
    if (walls[ii][0] == x && walls[ii][1] == y) return false;
  }
  return x >= 0 && x < width && y >= 0 && y < height;
}

void eatFlies() {
  vector <pii> eatenFlies;
  for (auto fly : flies)
    if (fly == pii(shipx, shipy)) eatenFlies.push_back(fly);
  fliesCaught += (int)eatenFlies.size();
  for (auto fly : eatenFlies) flies.erase(fly);
}

double computeScore() {
  LF maxScore = 50;
  LF score = (fliesCaught * fliesCaught - moves);
  return score / maxScore;
}

int main(int argc, char *argv[]) {
  init(argc, argv);
  for (int i=0;i<nFlies;++i) flies.insert(pii(fly_coords[i][0], fly_coords[i][1]));
  while (!ans.eof()) {
    char c = ans.readChar();
    if (c == 0) break;
    if (!validDirection(c)) {
      endProgram(0);
    }

    int index = directionToIndex(c);
    if (validPosition(shipx + DX[index], shipy + DY[index])) {
      shipx += DX[index];
      shipy += DY[index];
    }
    eatFlies();
    moves++;
    if (index == 4) waits++;
  }
  endProgram(computeScore());
}
