#include <cstdio>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

const int Dx[4] = {0, 0, 1, -1};
const int Dy[4] = {1, -1, 0, 0};

struct Fly {
  Fly(){}
  Fly(int xx, int yy) : x(xx), y(yy) {}
  int x, y;
};
int width, height, nfly;
vector<string> mp;

bool inRange(Fly t) {
  return 0 <= t.x && t.x < width && 0 <= t.y && t.y < height;
}

void walk(Fly src, Fly des) { 
  vector<vector<int>> vis(height, vector<int>(width, 0));
  vector<vector<Fly>> prev_pos(height, vector<Fly>(width));
  vector<vector<int>> prev_dir(height, vector<int>(width));
  vector<Fly> Q;
  Q.push_back(src);
  vis[src.x][src.y] = true;
  for (int i = 0; i < (int)Q.size(); i++) {
    auto u = Q[i];
    for (int dir = 0; dir < 4; dir ++) {
      Fly v(u.x + Dx[dir], u.y + Dy[dir]);
      if (inRange(v) && !vis[v.x][v.y] && mp[v.y][u.x] == '.') {
        vis[v.x][v.y] = true;
        prev_dir[v.x][v.y] = dir;
        prev_pos[v.x][v.y] = u;
        Q.push_back(v);
      }
    }
  }

  vector<int> output;
  auto cur = des;
  while (cur.x != src.x || cur.y != src.y) {
    output.push_back(prev_dir[cur.x][cur.y]);
    cur = prev_pos[cur.x][cur.y];
  }

  for (int i = (int)output.size() - 1; i >= 0; i --) {
    int dir = output[i];
    if (dir == 0) cout << "U";
    else if (dir == 1) cout << "D";
    else if (dir == 2) cout << "R";
    else cout << "L";
    cout << "\n";
  }
}

int main() {
  freopen("coop1.in", "r", stdin);
  freopen("coop1.out", "w", stdout);
  int frog_x, frog_y;
  cin >> width >> height >> nfly;
  cin >> frog_x >> frog_y;
  mp = vector<string>(height);
  for (int i = height - 1; i >= 0; i--)
    cin >> mp[i];
  vector<Fly> fly(nfly);
  for (int i = 0; i < nfly; i++) {
    char dir;
    cin >> fly[i].x >> fly[i].y >> dir;
    if (dir == 'D')
      fly[i].y--;
    else if (dir == 'U')
      fly[i].y++;
    else if (dir == 'L')
      fly[i].x--;
    else if (dir == 'R')
      fly[i].x++;
  }
  for (int i = 0; i < nfly - 1; i++)
    walk(i == 0 ? Fly(frog_x, frog_y) : fly[i - 1], fly[i]);
}
