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
vector<int> moveTo;
Coordinate ship;

int nextS = 0;
int spidersCaught = 0;
int moves = 0;
int waits = 0;
int W, H, nSpiders;
bool wall[500][500];

void moveShip(int d) {
  int nx = ship.x + DX[d];
  int ny = ship.y + DY[d];
  if (nx >= 0 && nx < W && ny >= 0 && ny < H && !wall[nx][ny]) {
    ship.x = nx;
    ship.y = ny;

    while (nextS < (int)spiders.size() && spiders[nextS].x == ship.x && spiders[nextS].y == ship.y) {
      spidersCaught++;
      nextS++;
      if (nextS < (int)spiders.size()) {
        spiders[nextS].x += DX[moveTo[nextS]];
        spiders[nextS].y += DY[moveTo[nextS]];
      }
    }
  }
}

int main(int argc, char *argv[]) {
  init(argc, argv);
  fscanf(inf, "%d%d", &W, &H);
  fscanf(inf, "%d%d", &ship.x, &ship.y);
  fscanf(inf, "%d", &nSpiders);
  spiders = vector<Coordinate>(nSpiders);
  moveTo = vector<int>(nSpiders); 
  for (int i = 0; i < nSpiders; i++) {
    char d[3];
    fscanf(inf, "%d%d%s", &spiders[i].x, &spiders[i].y, d);
    wall[spiders[i].x][spiders[i].y] = true;
    moveTo[i] = directionToIndex(d[0]);
  }

  while (!ans.eof()) {
    char c = ans.readChar();
    if (c == 0) break;

    int index = directionToIndex(c);
    moveShip(index);

    moves++;
    if (index == 4) waits++;
  }
  endProgram(2*spidersCaught-moves);
}
