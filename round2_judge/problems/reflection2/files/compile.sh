#!/bin/bash
cat check.cpp | sed 's$utils.h$../../../utils.h$' | g++ -x c++ -std=c++11 -O2 -static -o checker -
