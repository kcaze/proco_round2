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
  vector <int> ds;
};

vector <spider> spiders;
vector <int> alive;
Coordinate ship;

int nextS = 0;
int spidersCaught = 0;
int moves = 0;
int waits = 0;
int W, H, nSpiders;
bool wall[500][500];
double opt = 295.0;

bool inMap(int x, int y) {
  return 0 <= x && x < W && 0 <= y && y < H;
}

void eatSpiders() {
  for (int i = 0; i < nSpiders; i++) {
    if (alive[i] && spiders[i].x == ship.x && spiders[i].y == ship.y) {
      alive[i] = false;
      spidersCaught++;
    }
  }
}

void moveShip(int d) {
  int nx = ship.x + DX[d];
  int ny = ship.y + DY[d];
  if (nx >= 0 && nx < W && ny >= 0 && ny < H && !wall[nx][ny]) {
    ship.x = nx;
    ship.y = ny;
  }
  eatSpiders();
  for (int ii = 0; ii < nSpiders; ii++) {
    if (!alive[ii]) continue;
    spiders[ii].x += DX[spiders[ii].ds[moves%spiders[ii].ds.size()]];
    spiders[ii].y += DY[spiders[ii].ds[moves%spiders[ii].ds.size()]];
  }
  eatSpiders();
}

int main(int argc, char *argv[]) {
  init(argc, argv);
  fscanf(inf, " %d %d", &W, &H);
  fscanf(inf, " %d %d", &ship.x, &ship.y);
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
    fscanf(inf, " %d %d %d", &spiders[ii].x, &spiders[ii].y, &p);
    for (int jj = 0; jj < p; jj++) {
      char d;
      fscanf(inf, " %c", &d);
      spiders[ii].ds.push_back(directionToIndex(d));
    }
  }

  while (!ans.eof()) {
    char c = ans.readChar(); 
    if (c == 0) break;

    int index = directionToIndex(c);
    moveShip(index);

    moves++;
    if (index == 4) waits++;
  }
  endProgram((5*spidersCaught - moves) / opt);
}
