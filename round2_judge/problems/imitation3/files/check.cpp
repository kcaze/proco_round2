#include <iostream>
#include <cmath>
#include <set>
#include <vector>
#include <string>
#include "../../../utils.h"
using namespace std;

struct Coordinate {
  int x, y;
};

vector <Coordinate> spiders;
vector <int> alive;
Coordinate ship;

int nextS = 0;
int spidersCaught = 0;
int moves = 0;
int waits = 0;
int W, H, nSpiders;
bool wall[500][500];
double opt = 400.0;

void eatSpiders() {
  for (int i = 0; i < nSpiders; i++)
    if (alive[i] && spiders[i].x == ship.x && spiders[i].y == ship.y) {
      alive[i] = false;
      spidersCaught++;
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
  for (int i = 0; i < nSpiders; i++) 
    if (alive[i]) {
      int nx = spiders[i].x + DX[d];
      int ny = spiders[i].y + DY[d];
      if (nx >= 0 && nx < W && ny >= 0 && ny < H && !wall[nx][ny]) {
        spiders[i].x = nx;
        spiders[i].y = ny;
      }
    }
  eatSpiders();
}

int main(int argc, char *argv[]) {
  init(argc, argv);
  fscanf(inf, "%d%d", &W, &H);
  fscanf(inf, "%d%d", &ship.x, &ship.y);
  int nWalls;
  fscanf(inf, "%d", &nWalls);
  for (int i = 0; i < nWalls; i++) {
    int x, y;
    fscanf(inf, "%d%d", &x, &y);
    wall[x][y] = true;
  }
  fscanf(inf, "%d", &nSpiders);
  spiders = vector<Coordinate>(nSpiders);
  alive = vector<int>(nSpiders, 1);
  for (int i = 0; i < nSpiders; i++) {
    fscanf(inf, "%d%d", &spiders[i].x, &spiders[i].y);
  }

  while (!ans.eof()) {
    char c = ans.readChar(); 
    if (c == 0) break;

    int index = directionToIndex(c);
    moveShip(index);

    moves++;
    if (index == 4) waits++;
  }
  endProgram((spiders * (0.5 + exp(-moves/5000.0) / 2)) / opt);
}
