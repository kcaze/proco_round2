#include <iostream>
#include <random>

using namespace std;

int main() {
  random_device r;
  mt19937 el(r());

  uniform_real_distribution<double> uniform_dist(0, 1);
  int n = 100;
  double rate = 0.2;
  double fly_rate = 0.05;
  bool walls[n][n];
  bool flies[n][n];
  for (int ii = 0; ii < n; ii++) {
    for (int jj = 0; jj < n; jj++) {
      flies[ii][jj] = walls[ii][jj] = false;
    }
  }
  for (int ii = 0; ii < n; ii++) {
    walls[0][ii] = walls[n-1][ii] = walls[ii][0] = walls[ii][n-1] = true;
  }
  for (int ii = 1; ii < n-1; ii++) {
    for (int jj = 1; jj < n-1; jj++) {
      if (uniform_dist(el) < rate) {
        walls[ii][jj] = true;
      } else if (uniform_dist(el) < fly_rate) {
        flies[ii][jj] = true;
      }
    }
  }

  // Print out ASCII representation of level.
  for (int ii = 0; ii < n; ii++) {
    for (int jj = 0; jj < n; jj++) {
      cout << (walls[ii][jj] ? 'X' : (flies[ii][jj] ? '.' : ' '));
    }
    cout << endl;
  }

  // Print out JSON.
  cout << "function flymove() { return {x:this.x, y:this.y}; }" << endl;
  cout << "walls: [" << endl;
  for (int ii = 0; ii < n; ii++) {
    for (int jj = 0; jj < n; jj++) {
      if (walls[ii][jj]) {
        cout << "{x:" << jj << ",y:" << ii << "}," << endl;
      }
    }
  }
  cout << "]," << endl; 
  cout << "flies: [" << endl;
  for (int ii = 0; ii < n; ii++) {
    for (int jj = 0; jj < n; jj++) {
      if (flies[ii][jj]) {
        cout << "{x:" << jj << ",y:" << ii << ", move: flymove}," << endl;
      }
    }
  }
  cout << "]" << endl;
}
