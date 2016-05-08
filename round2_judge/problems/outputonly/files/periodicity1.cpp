#include <cmath>
#include <iostream>
#include <map>
#include <set>
#include <string>
#include <vector>
#include "utils.h"

using namespace std;

#define L 0
#define U 1
#define R 2
#define D 3
#define W 4

struct spider {
  int x;
  int y;
  vector <int> directions;
  bool dead;
};

int height, width;
int nwalls, nspiders;
int shipx, shipy;
double moves, waits;

vector <spider> spiders;
set <pii> walls;

double computeScore() {
  double spidersEaten = 0;
  for (auto spider : spiders) {
    if (spider.dead) spidersEaten++;
  }
  return (spidersEaten * spidersEaten) / (moves - waits + 1);
}

bool validPosition(int x, int y) {
  if (walls.count(pii(x,y))) return false;
  return x >= 0 && x < width && y >= 0 && y < height;
}

void eatSpiders() {
  for (auto spider : spiders) {
    if (spider.x == shipx && spider.y == shipy) {
      spider.dead = true;
    }
  }
}

void processMove(char c) {
  
}

void readLevel() {
  fscanf(inf, "%d %d", &width, &height);
  fscanf(inf, "%d %d", &shipx, &shipy);
  fscanf(inf, "%d", &nwalls);
  for (int ii = 0; ii < nwalls; ii++) {
    int x, y;
    fscanf(inf, "%d %d", &x, &y);
    walls.insert(pii(x, y));
  }
  fscanf(inf, "%d", &nspiders);
  for (int ii = 0; ii < nspiders; ii++) {
    spider s;
    int p;
    fscanf(inf, "%d %d %d", &s.x, &s.y, &p);
    while (p--) {
      char c;
      fscanf(inf, "%c", &c);
      s.directions.push_back(directionToIndex(c));
    }
    s.dead = false;
    spiders.push_back(s);
  }
}

int main(int argc, char *argv[]) {
  init(argc, argv);
  readLevel();
  while (!ans.eof()) {
  }
  endProgram(computeScore());
}

