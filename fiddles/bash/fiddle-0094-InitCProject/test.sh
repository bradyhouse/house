#!/usr/bin/env bash

source scripts/bin/_utils.sh;
source scripts/bin/c/.gccrc;
source scripts/bin/c/_create.sh;
source scripts/bin/c/_install.sh;
source scripts/bin/c/_start.sh;
source scripts/bin/c/_fork.sh;

function testUtilCapitalize() {
  actual=$(capitalize "template";);
  expected="Template";
  echo ${actual};
  if [[ ${actual} -ne ${expected} ]]
  then
    exit 5;
  fi
}

function testIsGccInstalled() {
  actual=$(isGccInstalled;);
  expected=0;
  if [[ ${actual} -ne ${expected} ]]
  then
    exit 1;
  fi
}

function testGccCreate() {
  bornOnDate=$(date +"%m-%d-%y";)
  name="fiddle-0000-Template";
  suffix=$(parseName ${name};);
  projectName=$(toLowerCase ${suffix};);
  cd "fiddles/c";
  gccCreate ${name} ${bornOnDate} ${projectName} || exit 2;
}

function testGccStart() {
  name="fiddle-0000-Template";
  cd "fiddles/c/${name}";
  gccStart || exit 3;
}

function testGccFork() {
  origFiddle="fiddle-0000-Template";
  newFiddle="fiddle-0001-Fork";
  cd scripts;
  if [[ -d "../fiddles/c/${newFiddle}" ]]; then rm -rf "../fiddles/c/${newFiddle}" || exit 4; fi
  cp -rf "../fiddles/c/${origFiddle}" "../fiddles/c/${newFiddle}" || exit 4;
  cd "../fiddles/c";
  gccFork ${origFiddle} ${newFiddle} || exit 4;
}

function tearDown() {
  if [[ -d "./fiddles/c/fiddle-0000-Template" ]]
  then
    rm -rf "./fiddles/c/fiddle-0000-Template";
  fi
  if [[ -d "./fiddles/c/fiddle-0001-Fork" ]]
  then
    rm -rf "./fiddles/c/fiddle-0001-Fork";
  fi
}

function catch() {
    case $1 in
        0)  endLog $(echo "$0" | sed 's/\.\///g');
            ;;
        1)  endLog "test 1 failed - testIsGccInstalled";
            ;;
        2)  endLog "test 2 failed - testGccCreate";
            ;;
        3)  endLog "test 3 failed - testGccStart";
            ;;
        4)  endLog "test 4 failed - testGccFork";
            ;;
        5)  endLog "test 5 failed - testUtilCapitalize";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    startingPoint=$(pwd);
    startLog $(echo "$0" | sed 's/\.\///g');
    groupLog "testUtilCapitalize";
    testUtilCapitalize || exit $?;
    groupLog "testIsGccInstalled";
    testIsGccInstalled || exit $?;
    groupLog "testGccCreate";
    testGccCreate || exit $?;
    cd "${startingPoint}";
    groupLog "testGccStart";
    testGccStart || exit $?;
    cd "${startingPoint}";
    groupLog "testGccFork";
    testGccFork || exit $?;
    cd "${startingPoint}";
    groupLog "tearDown";
    tearDown;
)
rc=$?; catch ${rc};
# finally
exit ${rc};
