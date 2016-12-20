#!/usr/bin/env bash

source scripts/bin/_utils.sh;
source scripts/bin/javac/.javacrc;
source scripts/bin/javac/_create.sh;
source scripts/bin/javac/_install.sh;
source scripts/bin/javac/_start.sh;
source scripts/bin/javac/_fork.sh;

function testUtilCapitalize() {
  actual=$(capitalize "template";);
  expected="Template";
  echo ${actual};
  if [[ ${actual} -ne ${expected} ]]
  then
    exit 5;
  fi
}

function testIsJavaInstalled() {
  actual=$(isJavaInstalled;);
  expected=0;
  if [[ ${actual} -ne ${expected} ]]
  then
    exit 1;
  fi
}

function testIsJavacInstalled() {
  actual=$(isJavacInstalled;);
  expected=0;
  if [[ ${actual} -ne ${expected} ]]
  then
    exit 1;
  fi
}

function testJavacCreate() {
  _type="javac";
  _path="fiddle-0000-Template";
  cd scripts;
  ./fiddle-create.sh ${_type} ${_path} || exit 2;
}

function testJavacStart() {
  _type="javac";
  _path="fiddle-0000-Template";
  cd scripts;
  ./fiddle-start.sh ${_type} ${_path} || exit 3;
}

function testJavacFork() {
  _type="javac";
  _criteria="0000";
  _fiddle="fiddle-0001-Fork";
  cd scripts;
  ./fiddle-fork.sh ${_type} ${_criteria} ${_fiddle} || exit 4;
}

function testJavacRefactor() {
  _type="javac";
  _criteria="0001";
  _fiddle="fiddle-0001-Refactor";
  cd scripts;
  ./fiddle-refactor.sh ${_type} ${_criteria} ${_fiddle} || exit 6;
}

function testJavacList() {
  _type="javac";
  cd scripts;
  ./fiddle-list.sh ${_type} || exit 7;
}

function testJavacDelete() {
  _type="javac";
  _path="fiddle-0001-Refactor";
  cd scripts;
  ./fiddle-delete.sh ${_type} ${_path} || exit 8;
}




function tearDown() {
  if [[ -e "CHANGELOG.md" ]]
  then
    rm -rf "CHANGELOG.md";
  fi
  if [[ -d "./fiddles/javac/fiddle-0001-Refactor" ]]
  then
    rm -rf "./fiddles/javac/fiddle-0001-Refactor";
  fi
  if [[ -d "./fiddles/javac/fiddle-0000-Template" ]]
  then
    rm -rf "./fiddles/javac/fiddle-0000-Template";
  fi
  if [[ -d "./fiddles/javac/fiddle-0001-Fork" ]]
  then
    rm -rf "./fiddles/javac/fiddle-0001-Fork";
  fi
}

function catch() {
    case $1 in
        0)  endLog $(echo "$0" | sed 's/\.\///g');
            ;;
        1)  endLog "test 1 failed - testIsJavacInstalled";
            ;;
        2)  endLog "test 2 failed - testJavacCreate";
            ;;
        3)  endLog "test 3 failed - testJavacStart";
            ;;
        4)  endLog "test 4 failed - testJavacFork";
            ;;
        5)  endLog "test 5 failed - testUtilCapitalize";
            ;;
        6)  endLog "test 6 failed - testJavacRefactor";
            ;;
        7)  endLog "test 7 failed - testJavacList";
            ;;
        8)  endLog "test 8 failed - testJavacDelete";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    startingPoint=$(pwd);
    cd "${startingPoint}";
    tearDown;
    cd "${startingPoint}";
    startLog $(echo "$0" | sed 's/\.\///g');
    groupLog "testUtilCapitalize";
    testUtilCapitalize || exit $?;
    groupLog "testIsJavacInstalled";
    testIsJavacInstalled || exit $?;
    groupLog "testIsJavaInstalled";
    testIsJavaInstalled || exit $?;
    groupLog "testJavacCreate";
    testJavacCreate || exit $?;
    cd "${startingPoint}";
    groupLog "testJavacStart";
    testJavacStart || exit $?;
    cd "${startingPoint}";
    groupLog "testJavacFork";
    testJavacFork || exit $?;
    cd "${startingPoint}";
    groupLog "testJavacRefactor";
    testJavacRefactor || exit $?;
    cd "${startingPoint}";
    groupLog "testJavacList";
    testJavacList || exit $?;
    cd "${startingPoint}";
    groupLog "testJavacDelete";
    testJavacDelete || exit $?;
    cd "${startingPoint}";
    groupLog "tearDown";
    tearDown;
)
rc=$?; catch ${rc};
# finally
exit ${rc};
