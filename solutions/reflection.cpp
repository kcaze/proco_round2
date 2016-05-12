#include <iostream>
#include <cmath>
#include <set>
#include <vector>
#include <string>
using namespace std;
int DX[5] = {-1, 0, 1, 0, 0};
int DY[5] = {0, -1, 0, 1, 0};
bool validDirection(char c) {
  return c == 'L' || c == 'U' || c == 'R' || c == 'D' || c == 'W';
}

int directionToIndex(char c) {
  if (c == 'L') {
    return 0;
  } else if (c == 'U') {
    return 1;
  } else if (c == 'R') {
    return 2;
  } else if (c == 'D') {
    return 3;
  } else {
    return 4;
  }
}

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
bool wall[5000][30];

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

void movespiders(int i) {
  int nx = spiders[i].x + DX[spiders[i].d];
  int ny = spiders[i].y + DY[spiders[i].d];
  if (!inMap(nx,ny)) {
    return;
  }
  if (!wall[nx][ny]) {
    spiders[i].x = nx;
    spiders[i].y = ny;
    return;
  }

  int rx = spiders[i].x + DX[RIGHT[spiders[i].d]];
  int ry = spiders[i].y + DY[RIGHT[spiders[i].d]];
  bool rw = !inMap(rx,ry) || wall[rx][ry];

  int lx = spiders[i].x + DX[LEFT[spiders[i].d]];
  int ly = spiders[i].y + DY[LEFT[spiders[i].d]];
  bool lw = !inMap(lx,ly) || wall[lx][ly];

  if ((lw && rw) || (!lw && !rw)) {
    return;
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
      movespiders(i);
    }
  eatSpiders();
}

bool xIs1 = false;

int calcWaitTime(int i, int tx, int ty) {
  static bool vis[5000][30][4];
  memset(vis, 0, sizeof(vis));
  Coordinate cp = spiders[i];
  vis[spiders[i].x][spiders[i].y][spiders[i].d] = true;
  int waitTime = 0;
  while (true) {
    movespiders(i);
    if (vis[spiders[i].x][spiders[i].y][spiders[i].d]) {
      spiders[i] = cp;
      return -1;
    }
    waitTime++;
    vis[spiders[i].x][spiders[i].y][spiders[i].d] = true;
    if (spiders[i].x == tx && spiders[i].y == ty) {
      spiders[i] = cp;
      return waitTime;
    }
  }
}

int main() {
  FILE *inf = fopen("reflection3.txt", "r");
  FILE *ouf= fopen("reflection3.ans", "w");
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

  for (int x = 0; x < W - 1; x++) {
    xIs1 = x == 1;
    int maxWait = 0;
    int stillAlive = 0;
    for (int i = 0; i < nSpiders; i++)
      if (alive[i]) {
        stillAlive++;
        int t = calcWaitTime(i, ship.x, ship.y);
        if (t >= 0) {
          maxWait = max(maxWait, t);
        }
      }
    while (maxWait--) {
      waits++;
      fprintf(ouf, "W\n");
      moveShip(directionToIndex('W'));
    }
    if (spidersCaught == nSpiders) break;
    fprintf(ouf, "R\n");
    moveShip(directionToIndex('R'));
  }
  fclose(inf);
  fclose(ouf);
}
