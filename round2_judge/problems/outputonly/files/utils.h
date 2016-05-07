#include <fstream>
#include <string>
#include <cstring>
#include <iostream>
#include <cstdio>
#include <cassert>
using namespace std;

typedef pair<int,int> pii;
typedef long long int LL;
typedef double LF;

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

void endProgram(double score);

class FileReader {
  FILE *f;
  bool isRead;
public:
  FileReader() {}
  FileReader(char *filename) {
    if (filename != NULL) {
      f = fopen(filename, "r");
      isRead = 0;
    }
    else f = NULL;
  }

  void close() {fclose(f);}
  bool isNull() {return f == NULL;}
  char readChar(bool ignoreWhiteSpace = true) {
    char c;
    if (ignoreWhiteSpace) {
      fscanf(f, " %c ", &c);
    } else {
      fscanf(f, "%c", &c);
    }
    if (!validDirection(c)) {
      endProgram(0);
    }
    isRead = true;
    return c;
  }

  bool eof() {
    if (isRead) return feof(f);
    return false;
  }
};

//inf is Input, ouf is output, ans is user submission
FileReader ouf, ans;
FILE *inf;

int DX[5] = {-1, 0, 1, 0, 0};
int DY[5] = {0, -1, 0, 1, 0};

void init(int argc, char * argv[]) {
  assert(argc == 4);
  inf = fopen(argv[1], "r");
  ouf = FileReader(argv[2]);
  ans = FileReader(argv[3]);
}

void endProgram(double score) {
  fclose(inf);
  ouf.close();
  ans.close();
  printf("%.2lf\n",score);
  exit(0);
}

