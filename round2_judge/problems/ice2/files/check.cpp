#include <iostream>
#include <cmath>
#include <set>
#include <vector>
#include <string>
#include "../../../utils.h"
using namespace std;

const int LEFT[4] = {3, 0, 1, 2};
const int RIGHT[4] = {1,2,3,0};

struct Coordinate {
  int x, y, d;
};

struct spider {
  int x, y;
};

vector <spider> spiders;
vector <int> alive;
Coordinate ship;
int prevx, prevy;

int nextS = 0;
int spidersCaught = 0;
int moves = 0;
int waits = 0;
int W, H, nSpiders;
bool wall[500][500];
double opt = 9.56;

bool inMap(int x, int y) {
  return 0 <= x && x < W && 0 <= y && y < H;
}

void eatSpiders() {
  for (int i = 0; i < nSpiders; i++) {
    if (!alive[i]) continue;
    int d = ship.d;
    int x = prevx;
    int y = prevy;
    while (x != ship.x || y != ship.y) {
      if (spiders[i].x == x && spiders[i].y == y) {
        alive[i] = false;
        spidersCaught++;
      }
      x += DX[d];
      y += DY[d];
    }
    if (spiders[i].x == x && spiders[i].y == y) {
      alive[i] = false;
      spidersCaught++;
    }
  }
}

void moveShip(int d) {
  ship.d = d;
  int nx = ship.x; + DX[d];
  int ny = ship.y; + DY[d];
  while (true) {
    if (nx < 0 || nx >= W || ny < 0 || ny >= H || wall[nx][ny]) {
      break;
    }
    nx += DX[d];
    ny += DY[d];
  }
  ship.x = nx - DX[d];
  ship.y = ny - DY[d];
  eatSpiders();
  prevx = ship.x;
  prevy = ship.y;
}

int main(int argc, char *argv[]) {
  init(argc, argv);
  fscanf(inf, " %d %d", &W, &H);
  fscanf(inf, " %d %d", &ship.x, &ship.y);
  prevx = ship.x;
  prevy = ship.y;
  int nWalls;
  fscanf(inf, " %d", &nWalls);
  for (int i = 0; i < nWalls; i++) {
    int x, y;
    fscanf(inf, " %d %d", &x, &y);
    wall[x][y] = true;
  }
  fscanf(inf, " %d", &nSpiders);
  spiders = vector<spider>(nSpiders);
  alive = vector<int>(nSpiders, 1);
  for (int ii = 0; ii < nSpiders; ii++) {
    int p;
    fscanf(inf, " %d %d ", &spiders[ii].x, &spiders[ii].y);
  }

  while (!ans.eof()) {
    char c = ans.readChar(); 
    if (c == 0) break;

    int index = directionToIndex(c);
    moveShip(index);

    moves++;
    if (index == 4) waits++;
  }
  double score = (spidersCaught*spidersCaught)/((double)moves+1);
  endProgram(score / opt);
}
