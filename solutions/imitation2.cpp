#include <cstdio>
#include <algorithm>
using namespace std;
int maxx[5000], minx[5000];

int main() {
  freopen("imitation2.txt", "r", stdin);
  freopen("imitation2.ans", "w", stdout);
  int W, H;
  int sx, sy;
  scanf("%d%d", &W, &H);
  scanf("%d%d", &sx, &sy);
  int nw;
  scanf("%d", &nw);
  memset(maxx, 0, sizeof(maxx));
  memset(minx, 0x3f, sizeof(minx));
  while (nw--) {
    int x, y;
    scanf("%d%d", &x, &y);
    if (y >= 100) {
      maxx[y] = max(maxx[y], x);
      minx[y] = min(minx[y], x);
    }
  }
  for (int y = 100; y <= 198; y++) {
    if (maxx[y] == maxx[y+1])
      printf("D\n");
    else {
      printf("R\nL\nL\nR\nD\n");
    }
  }
}
