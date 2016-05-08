#include <fstream>
#include <string>
#include <cstring>
#include <iostream>
#include <cassert>
using namespace std;

typedef pair<int,int> pii;
typedef long long int LL;
typedef double LF;

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
  char readChar(bool ignoreWhiteSpace = 1) {
    char c;
    if (ignoreWhiteSpace) fscanf(f, " %c", &c);
    else fscanf(f, "%c", &c);
    isRead = true;
    return c;
  }

  bool eof() {
    if (isRead) return feof(f);
    return false;
  }
};

//inf is Input, ouf is output, ans is user submission
FileReader inf, ouf, ans;

void init(int argc, char * argv[]) {
  assert(argc == 4);
  inf = FileReader(argv[1]);
  ouf = FileReader(argv[2]);
  ans = FileReader(argv[3]);
  ans.readChar();
}

void endProgram(double score) {
  inf.close();
  ouf.close();
  ans.close();
  printf("%.2lf\n",score);
  exit(0);
}
