#!/bin/sh

declare -a array=("maximization" "ice" "periodicity" "reaction" "imitation" "reflection")

# get length of an array
arraylength=${#array[@]}

# use for loop to read all values and indexes
for (( i=1; i<${arraylength}+1; i++ ));
do
  for (( j=1; j<=3; j++ ));
  do
    cd ${array[$i-1]}$j
    cd files
    g++ -w -std=c++11 -o check.o check.cpp
    echo ${array[$i-1]}$j
    ./check.o ../tests/01 ../tests/01.a ../tests/01.a
    cd ../../
  done
done
