Steps:
1. Suppose the problem name is blah. 
2. Add blah into proco.xml.
3. Create the directory problems/blah. Enter this directory. 
4. Create problem.xml (you can make a copy of this and change the 'value' attribute of <name> to the desired title).
5. Create the tests directory. This directory should contain two files, 01 (the input file) and 01.a (the output file)
5a. 01 will be the input file presented to the contestants and read by the checker when judging. 01.a can be blank if you do not need a solution file (but the file should still exist).
6. Create the files directory. It should contain check.cpp

Notes:
1. Please do not move the position of utils.h
2. If the above instructions are unclear, please check the periodicity1 folder and follow the exact format. 
3. Under periodicity1/files, I created two files compile.sh and score.sh to help you.
3a. To compile, just type
      ./compile
3b. To test a submission file (for example, ans.txt), just type
      ./score ans.txt
    Please make sure you have already compiled
4. Note on judge: you must output a floating point between 0 and 1, where 1 is the max score. To make periodicity1 work I divided the score by 100.0, you may want to fix that).


