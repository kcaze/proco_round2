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

vector <Coordinate> spiders;
vector <int> alive;
Coordinate ship;

int nextS = 0;
int spidersCaught = 0;
int moves = 0;
int waits = 0;
int W, H, nSpiders;
bool wall[1000][50];
double opt = 650.0;

bool inMap(int x, int y) {
  return 0 <= x && x < W && 0 <= y && y < H;
}

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
      int nx = spiders[i].x + DX[spiders[i].d];
      int ny = spiders[i].y + DY[spiders[i].d];
      if (!inMap(nx,ny)) {
        continue;
      }
      if (!wall[nx][ny]) {
        spiders[i].x = nx;
        spiders[i].y = ny;
        continue;
      }

      int rx = spiders[i].x + DX[RIGHT[spiders[i].d]];
      int ry = spiders[i].y + DY[RIGHT[spiders[i].d]];
      bool rw = !inMap(rx,ry) || wall[rx][ry];

      int lx = spiders[i].x + DX[LEFT[spiders[i].d]];
      int ly = spiders[i].y + DY[LEFT[spiders[i].d]];
      bool lw = !inMap(lx,ly) || wall[lx][ly];

      if ((lw && rw) || (!lw && !rw)) {
        continue;
      }
      if (lw) {
        spiders[i].d = RIGHT[spiders[i].d];
        spiders[i].x = rx;
        spiders[i].y = ry;
      } else {
        spiders[i].d = LEFT[spiders[i].d];
        spiders[i].x = lx;
        spiders[i].y = ly;
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
    char dir[4];
    fscanf(inf, "%d%d%s", &spiders[i].x, &spiders[i].y, dir);
    spiders[i].d = directionToIndex(dir[0]);
  }

  while (!ans.eof()) {
    char c = ans.readChar(); 
    if (c == 0) break;

    int index = directionToIndex(c);
    moveShip(index);

    moves++;
    if (index == 4) waits++;
  }
  endProgram(((2. * spidersCaught - (moves - waits)) * (0.5 + exp(-waits/ 300.) / 2.)) / opt);
}
